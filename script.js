// Grab DOM elements
const openBtn = document.getElementById('open-btn');
const giftContainer = document.getElementById('gift-container');
const surpriseScreen = document.getElementById('surprise-screen');
const mediaHolder = document.getElementById('media-holder');
const bgMusic = document.getElementById('bg-music');

// Add click listener to the OPEN button
openBtn.addEventListener('click', () => {
    
    // 1. Swap background gradient
    document.body.classList.add('celebrate-bg');

    // 2. Run Confetti Effect
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => {
        confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
    }, 250);

    // 3. Swap visibility layouts instantly
    giftContainer.style.display = 'none';
    surpriseScreen.classList.remove('hidden');

    // 4. Inject Videos and Image dynamically (GitHub disguise names applied)
    if (mediaHolder.innerHTML === '') {
        
        // A. Left Video
        const leftVideo = document.createElement('video');
        leftVideo.src = 'asset2.mp4';
        leftVideo.classList.add('surprise-media');
        leftVideo.autoplay = true;
        leftVideo.loop = true;
        leftVideo.muted = true; // Essential to ensure browsers allow immediate autoplay execution
        leftVideo.playsInline = true; // Prevents iOS devices from full-screening the video natively
        
        // B. Center Picture
        const centerImg = document.createElement('img');
        centerImg.src = 'asset1.jpg';
        centerImg.alt = 'Your Gift';
        centerImg.classList.add('surprise-media');
        centerImg.id = 'gift-pic';

        // C. Right Video (Cloned from same video resource source)
        const rightVideo = document.createElement('video');
        rightVideo.src = 'asset2.mp4';
        rightVideo.classList.add('surprise-media');
        rightVideo.autoplay = true;
        rightVideo.loop = true;
        rightVideo.muted = true;
        rightVideo.playsInline = true;

        // Append to the wrapper div in exact order
        mediaHolder.appendChild(leftVideo);
        mediaHolder.appendChild(centerImg);
        mediaHolder.appendChild(rightVideo);
    }

    // 5. Play background music
    bgMusic.play().catch(error => {
        console.log("Audio block handled.", error);
        window.addEventListener('click', () => {
            bgMusic.play();
        }, { once: true });
    });
});