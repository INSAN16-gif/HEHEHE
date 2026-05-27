// ==========================================
// GLOBAL DOM ELEMENT REFS
// ==========================================
const openBtn = document.getElementById('open-btn');
const giftContainer = document.getElementById('gift-container');
const surpriseScreen = document.getElementById('surprise-screen');
const bgMusic = document.getElementById('bg-music');
const sfxTap = document.getElementById('sfx-tap');
const sfxVictory = document.getElementById('sfx-victory');

// Game State Tracker Variables
let tapCount = 0;
const maxTaps = 5;

// ==========================================
// SCREEN 1: OPEN BUTTON CLICK LOGIC
// ==========================================
openBtn.addEventListener('click', () => {
    // 1. Swap background gradient instantly to the surprise/image background rules
    document.body.classList.add('celebrate-bg');

    // 2. Fire the initial open confetti burst
    confetti({ 
        particleCount: 150, 
        spread: 80, 
        origin: { y: 0.6 } 
    });

    // 3. Toggle layout screens visibility
    giftContainer.style.display = 'none';
    surpriseScreen.classList.remove('hidden');

    // 4. PERFORMANCE FIX: Play preloaded HTML videos instantly to eliminate delays
    const leftVid = document.getElementById('left-video');
    const rightVid = document.getElementById('right-video');
    if (leftVid) leftVid.play().catch(e => console.log("Left video autoplay block bypassed."));
    if (rightVid) rightVid.play().catch(e => console.log("Right video autoplay block bypassed."));

    // 5. Inject the center square image container dynamically
    const imgContainer = document.getElementById('image-container');
    if (imgContainer && imgContainer.innerHTML === '') {
        const centerImg = document.createElement('img');
        centerImg.src = 'asset1.jpg'; // The first square photo (slippers)
        centerImg.alt = 'Your Gift';
        centerImg.id = 'gift-pic';

        // Bind the tap game event click listener directly to the center picture
        centerImg.addEventListener('click', handlePictureTap);
        imgContainer.appendChild(centerImg);
    }

    // 6. Play the main background looping track smoothly
    bgMusic.play().catch(error => {
        console.log("Audio waiting for explicit user interaction context handler.", error);
        // Fallback strategy just in case mobile tracking blocks it initially
        window.addEventListener('click', () => { 
            bgMusic.play(); 
        }, { once: true });
    });
});

// ==========================================
// SCREEN 2: TAP SURPRISE GAME MODULE
// ==========================================
function handlePictureTap() {
    if (tapCount < maxTaps) {
        tapCount++;
        
        // 1. Grow the visual tracking progress bar width percentage formula
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const percentage = (tapCount / maxTaps) * 100;
            progressBar.style.width = `${percentage}%`;
        }

        // 2. Evaluate Click Conditions
        if (tapCount === maxTaps) {
            // 🎉 VICTORY TARGET REACHED (5th TAP)
            
            // Play the unique victory sound effect track
            sfxVictory.currentTime = 0;
            sfxVictory.play().catch(e => console.log("Victory SFX audio context block handled."));

            // Swap center image element resource link path to the final secret image asset
            const centerImg = document.getElementById('gift-pic');
            if (centerImg) {
                centerImg.src = 'asset3.jpg'; // Changes to your final green witch cat image
            }
            
            // Update UI message text header
            const instructionText = document.getElementById('instruction-text');
            if (instructionText) {
                instructionText.innerHTML = "✨ TRUE PRIZE CLAIMED! ENJOY YOUR SPECIAL DAY! ✨";
            }
            
            // Unleash the massive victory confetti storm layout pop
            confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
            setTimeout(() => {
                confetti({ particleCount: 70, angle: 60, spread: 60, origin: { x: 0 } });
                confetti({ particleCount: 70, angle: 120, spread: 60, origin: { x: 1 } });
            }, 250);
            
        } else {
            // 🔊 STANDARD TAPS (Clicks 1, 2, 3, and 4)
            sfxTap.currentTime = 0;
            sfxTap.play().catch(e => console.log("Tap SFX audio context block handled."));
        }
    }
}
