// Global DOM Element Targets
const openBtn = document.getElementById('open-btn');
const giftContainer = document.getElementById('gift-container');
const surpriseScreen = document.getElementById('surprise-screen');
const bgMusic = document.getElementById('bg-music');
const sfxTap = document.getElementById('sfx-tap');
const sfxVictory = document.getElementById('sfx-victory');

// Tap Game State Parameters
let tapCount = 0;
const maxTaps = 5;

// OPEN Button Trigger Handler
openBtn.addEventListener('click', () => {
    // 1. Change background rules to trigger custom picture layout style
    document.body.classList.add('celebrate-bg');

    // 2. Fire the open confetti blast pop
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });

    // 3. Swap screen layouts
    giftContainer.style.display = 'none';
    surpriseScreen.classList.remove('hidden');

    // 4. Instantly start preloaded HTML layout video tracking to erase mobile delay
    const leftVid = document.getElementById('left-video');
    const rightVid = document.getElementById('right-video');
    if (leftVid) leftVid.play().catch(e => console.log("Left video playback context handled."));
    if (rightVid) rightVid.play().catch(e => console.log("Right video playback context handled."));

    // 5. Inject center image asset source frame dynamically inside container node
    const imgContainer = document.getElementById('image-container');
    if (imgContainer && imgContainer.innerHTML === '') {
        const centerImg = document.createElement('img');
        centerImg.src = 'asset1.jpg'; // Slippers picture
        centerImg.alt = 'Your Gift';
        centerImg.id = 'gift-pic';

        // Connect tap game sequence trigger
        centerImg.addEventListener('click', handlePictureTap);
        imgContainer.appendChild(centerImg);
    }

    // 6. Play primary audio song continuous loop
    bgMusic.play().catch(error => {
        console.log("Audio awaiting explicit user touch verification.", error);
        window.addEventListener('click', () => { bgMusic.play(); }, { once: true });
    });
});

// Image Tapping Progression Module Logic
function handlePictureTap() {
    if (tapCount < maxTaps) {
        tapCount++;
        
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const percentage = (tapCount / maxTaps) * 100;
            progressBar.style.width = `${percentage}%`;
        }

        if (tapCount === maxTaps) {
            // 🏆 VICTORY CONDITION MET (5th Tap)
            sfxVictory.currentTime = 0;
            sfxVictory.play().catch(e => console.log("Victory audio context block handled."));

            // 👈 NEW: Hide the p1 subtext message instantly on the 5th tap!
            const subtextP1 = document.getElementById('subtext-p1');
            if (subtextP1) {
                subtextP1.style.display = 'none'; // Completely removes it from screen view
            }

            const centerImg = document.getElementById('gift-pic');
            if (centerImg) {
                centerImg.src = 'asset3.jpg'; 
            }
            
            const instructionText = document.getElementById('instruction-text');
            if (instructionText) {
                instructionText.innerHTML = "✨ YIS GALING TAINA! ✨";
            }
            
            confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
            setTimeout(() => {
                confetti({ particleCount: 70, angle: 60, spread: 60, origin: { x: 0 } });
                confetti({ particleCount: 70, angle: 120, spread: 60, origin: { x: 1 } });
            }, 250);
            
        } else {
            sfxTap.currentTime = 0;
            sfxTap.play().catch(e => console.log("Tap audio context block handled."));
        }
    }
}