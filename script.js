// Grab DOM elements
const openBtn = document.getElementById('open-btn');
const giftContainer = document.getElementById('gift-container');
const surpriseScreen = document.getElementById('surprise-screen');
const mediaHolder = document.getElementById('media-holder');
const bgMusic = document.getElementById('bg-music');
const sfxTap = document.getElementById('sfx-tap');
const sfxVictory = document.getElementById('sfx-victory'); // 👈 NEW: Grab victory element

// Game State Tracker variables
let tapCount = 0;
const maxTaps = 5;

// Add click listener to the OPEN button
openBtn.addEventListener('click', () => {
    
    document.body.classList.add('celebrate-bg');

    // Initial Open Confetti
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });

    giftContainer.style.display = 'none';
    surpriseScreen.classList.remove('hidden');

    if (mediaHolder.innerHTML === '') {
        // Left Video
        const leftVideo = document.createElement('video');
        leftVideo.src = 'asset2.mp4';
        leftVideo.classList.add('surprise-media');
        leftVideo.autoplay = true;
        leftVideo.loop = true;
        leftVideo.muted = true;
        leftVideo.playsInline = true;
        
        // Center Picture
        const centerImg = document.createElement('img');
        centerImg.src = 'asset1.jpg'; // First picture shown
        centerImg.alt = 'Your Gift';
        centerImg.classList.add('surprise-media');
        centerImg.id = 'gift-pic';

        // Add the click listener to the picture for the tap mini-game
        centerImg.addEventListener('click', handlePictureTap);

        // Right Video
        const rightVideo = document.createElement('video');
        rightVideo.src = 'asset2.mp4';
        rightVideo.classList.add('surprise-media');
        rightVideo.autoplay = true;
        rightVideo.loop = true;
        rightVideo.muted = true;
        rightVideo.playsInline = true;

        mediaHolder.appendChild(leftVideo);
        mediaHolder.appendChild(centerImg);
        mediaHolder.appendChild(rightVideo);
    }

    // Play background music loop continuous
    bgMusic.play().catch(error => {
        console.log("Audio waiting for user verification handle.", error);
        window.addEventListener('click', () => { bgMusic.play(); }, { once: true });
    });
});

// Handle Tapping the Picture Module Logic
function handlePictureTap() {
    if (tapCount < maxTaps) {
        tapCount++;
        
        // 1. Grow the tracking progress bar width
        const progressBar = document.getElementById('progress-bar');
        const percentage = (tapCount / maxTaps) * 100;
        progressBar.style.width = `${percentage}%`;

        // 2. Check if they hit the target click threshold
        if (tapCount === maxTaps) {
            
            // 🔊 NEW: Play the victory sound effect on the 5th press!
            sfxVictory.currentTime = 0;
            sfxVictory.play().catch(e => console.log("Audio waiting for interaction."));

            // Unlocked! Swap to the second picture asset resource file path
            const centerImg = document.getElementById('gift-pic');
            centerImg.src = 'asset3.jpg'; 
            
            // Update Text layout
            document.getElementById('instruction-text').innerHTML = "✨ YIIIS GALING TAINA! ✨";
            
            // Victory Confetti Storm!
            confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
            setTimeout(() => {
                confetti({ particleCount: 70, angle: 60, spread: 60, origin: { x: 0 } });
                confetti({ particleCount: 70, angle: 120, spread: 60, origin: { x: 1 } });
            }, 250);
            
        } else {
            // 🔊 Play regular tap sound effect for clicks 1, 2, 3, and 4
            sfxTap.currentTime = 0;
            sfxTap.play().catch(e => console.log("Audio waiting for interaction."));
        }
    }
}