// Global variables
let scene, camera, renderer, composer;
let scrollProgress = 0;
let currentScene = 0;
let audioContext, audioSource, gainNode;
let isPlaying = false;
let currentTrack = 0;
let particles = [];
let rosePetals = [];
let ringBox, ring;
let heartParticles = [];
let confettiParticles = [];
let fireworks = [];
let bloomPass, unrealBloomPass;
let config = {};

// Load configuration
async function loadConfig() {
    try {
        const response = await fetch('config/config.json');
        config = await response.json();
        console.log('Config loaded:', config);
        return config;
    } catch (error) {
        console.error('Error loading config:', error);
        return null;
    }
}

// Music playlist
const playlist = [
    { title: "Can't Help Falling in Love", artist: "Elvis Presley", file: "assets/audio/song1.mp3" },
    { title: "Perfect", artist: "Ed Sheeran", file: "assets/audio/song2.mp3" },
    { title: "All of Me", artist: "John Legend", file: "assets/audio/song3.mp3" },
    { title: "Thinking Out Loud", artist: "Ed Sheeran", file: "assets/audio/song4.mp3" },
    { title: "A Thousand Years", artist: "Christina Perri", file: "assets/audio/song5.mp3" },
    { title: "Love Story", artist: "Taylor Swift", file: "assets/audio/song6.mp3" }
];

// Love reasons - will be loaded from config
let loveReasons = [];

// Memories - will be loaded from config
let memories = [];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing...');
    
    // Check for URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const customConfig = {
        names: {
            yourName: urlParams.get('yourName') || config.names?.yourName || 'Rohit',
            herName: urlParams.get('partnerName') || config.names?.herName || 'Sonam'
        },
        proposal: {
            question: urlParams.get('question') || config.proposal?.question || 'Will You Marry Me?',
            subtitle: urlParams.get('message') || config.proposal?.subtitle || 'Click the heart to open',
            title: urlParams.get('title') || config.proposal?.title || 'Our Forever'
        }
    };
    
    // Merge with loaded config
    config = { ...config, ...customConfig };
    
    // Load config first
    await loadConfig();
    
    // Use config data or fallback to defaults
    if (config.names) {
        loveReasons = config.loveReasons || [];
        memories = config.memories || [];
        
        // Populate HTML with config data
        populateContentFromConfig();
    }
    
    init();
    setupEventListeners();
    populateMemories();
    simulateLoading();
    
    // Setup customization modal
    setupCustomization();
});

function populateContentFromConfig() {
    // Scene 1: Names
    if (config.names) {
        const scene1Title = document.getElementById('scene1-title');
        const scene1Subtitle = document.getElementById('scene1-subtitle');
        
        if (scene1Title) {
            scene1Title.textContent = `${config.names.yourName} & ${config.names.herName}`;
        }
        if (scene1Subtitle) {
            scene1Subtitle.textContent = config.proposal.title || 'Our Forever';
        }
    }
    
    // Scene 5: Proposal question
    if (config.proposal) {
        const proposalQuestion = document.getElementById('proposal-question');
        const proposalSubtitle = document.getElementById('proposal-subtitle');
        
        if (proposalQuestion) {
            proposalQuestion.textContent = config.proposal.question || 'Will You Marry Me?';
        }
        if (proposalSubtitle) {
            proposalSubtitle.textContent = config.proposal.subtitle || 'Click the heart to open';
        }
    }
    
    // Celebration title
    if (config.celebration) {
        const celebrationTitle = document.getElementById('celebration-title');
        if (celebrationTitle) {
            celebrationTitle.textContent = config.celebration.title || 'SHE SAID YES!';
        }
    }
}

function init() {
    console.log('Initializing scene...');
    
    // Setup Three.js scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a2e, 0.02);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.setClearColor(0x0a0a2e, 1);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xFF1744, 5, 100);
    pointLight.position.set(5, 5, 5);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xF50057, 3, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xFFFFFF, 2, 100);
    pointLight3.position.set(0, 0, 10);
    scene.add(pointLight3);

    // Create scene elements
    createHeartParticles();
    createRosePetals();
    createRingBox();
    createStarfield();

    // Setup post-processing
    setupPostProcessing();

    // Setup GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Start animation loop
    animate();
    
    // Show first scene overlay
    setTimeout(() => {
        showSceneOverlay('scene-1');
        console.log('Scene initialized and first overlay shown');
    }, 2000);
}

function setupPostProcessing() {
    // Note: For a complete post-processing setup, you would need to import
    // EffectComposer, RenderPass, and UnrealBloomPass from Three.js examples
    // For this demo, we'll use a simpler approach with renderer settings
    
    // Enable tone mapping for better color rendering
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    // Enable shadow maps for better depth
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Enable antialiasing
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function createHeartParticles() {
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        // Heart shape formula
        const t = Math.random() * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
        const z = (Math.random() - 0.5) * 2;

        positions[i * 3] = x * 0.15;
        positions[i * 3 + 1] = y * 0.15;
        positions[i * 3 + 2] = z;

        // Pink to red gradient
        colors[i * 3] = 1;
        colors[i * 3 + 1] = Math.random() * 0.3;
        colors[i * 3 + 2] = Math.random() * 0.5;

        sizes[i] = Math.random() * 3 + 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        size: 0.3,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    particleSystem.userData = { 
        originalPositions: positions.slice(),
        speeds: Array(particleCount).fill(0).map(() => Math.random() * 0.02 + 0.01)
    };
    
    scene.add(particleSystem);
    heartParticles.push(particleSystem);
}

function createRosePetals() {
    const petalCount = 200;
    const petalGeometry = new THREE.PlaneGeometry(0.1, 0.15);
    const petalMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF1744,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });

    for (let i = 0; i < petalCount; i++) {
        const petal = new THREE.Mesh(petalGeometry, petalMaterial);
        petal.position.set(
            (Math.random() - 0.5) * 10,
            Math.random() * 10 + 5,
            (Math.random() - 0.5) * 5
        );
        petal.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        petal.userData = {
            speed: Math.random() * 0.02 + 0.01,
            rotationSpeed: Math.random() * 0.02,
            wobble: Math.random() * Math.PI * 2
        };
        scene.add(petal);
        rosePetals.push(petal);
    }
}

function createRingBox() {
    // Ring box
    const boxGeometry = new THREE.BoxGeometry(1.5, 0.8, 1);
    const boxMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        metalness: 0.8,
        roughness: 0.2
    });
    ringBox = new THREE.Mesh(boxGeometry, boxMaterial);
    ringBox.position.set(0, 0, 0);
    ringBox.visible = false;
    scene.add(ringBox);

    // Ring
    const ringGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFD700,
        metalness: 1,
        roughness: 0.1
    });
    ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(0, 0.5, 0);
    ring.rotation.x = Math.PI / 2;
    ring.visible = false;
    scene.add(ring);

    // Diamond
    const diamondGeometry = new THREE.OctahedronGeometry(0.1);
    const diamondMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        metalness: 1,
        roughness: 0,
        transparent: true,
        opacity: 0.9
    });
    const diamond = new THREE.Mesh(diamondGeometry, diamondMaterial);
    diamond.position.set(0.3, 0.5, 0);
    ring.add(diamond);
}

function createStarfield() {
    const starCount = 1000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 100;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.1,
        transparent: true,
        opacity: 0.8
    });

    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);
}

function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    // Animate heart particles
    heartParticles.forEach(system => {
        const positions = system.geometry.attributes.position.array;
        const speeds = system.userData.speeds;
        
        for (let i = 0; i < positions.length / 3; i++) {
            const idx = i * 3;
            positions[idx] += Math.sin(time * speeds[i] + i) * 0.01;
            positions[idx + 1] += Math.cos(time * speeds[i] + i) * 0.01;
        }
        system.geometry.attributes.position.needsUpdate = true;
    });

    // Animate rose petals
    rosePetals.forEach(petal => {
        petal.position.y -= petal.userData.speed;
        petal.rotation.x += petal.userData.rotationSpeed;
        petal.rotation.y += petal.userData.rotationSpeed;
        petal.position.x += Math.sin(time + petal.userData.wobble) * 0.01;

        // Reset position when falls below
        if (petal.position.y < -5) {
            petal.position.y = 10;
            petal.position.x = (Math.random() - 0.5) * 10;
        }
    });

    // Animate ring box
    if (ringBox.visible) {
        ringBox.rotation.y += 0.01;
        ring.rotation.y += 0.01;
    }

    // Update based on scroll progress
    updateSceneByScroll();

    renderer.render(scene, camera);
}

function updateSceneByScroll() {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
    // Scene 1: Enchanted Entry (0-10%)
    if (scrollPercent < 0.1) {
        showSceneOverlay('scene-1');
        camera.position.z = 5 - scrollPercent * 10;
    }
    
    // Scene 2: Memory Lane (10-30%)
    else if (scrollPercent >= 0.1 && scrollPercent < 0.3) {
        showSceneOverlay('scene-2');
        camera.position.z = 4 + Math.sin(scrollPercent * Math.PI) * 2;
        camera.position.y = (scrollPercent - 0.1) * 5;
    }
    
    // Scene 3: Reasons (30-50%)
    else if (scrollPercent >= 0.3 && scrollPercent < 0.5) {
        showSceneOverlay('scene-3');
        camera.position.z = 5;
        camera.position.y = 1;
        
        // Rotate heart particles
        heartParticles.forEach(system => {
            system.rotation.y += 0.005;
        });
    }
    
    // Scene 4: Future (50-70%)
    else if (scrollPercent >= 0.5 && scrollPercent < 0.7) {
        showSceneOverlay('scene-4');
        camera.position.z = 6;
    }
    
    // Scene 5: Proposal (70-90%)
    else if (scrollPercent >= 0.7 && scrollPercent < 0.9) {
        showSceneOverlay('scene-5');
        ringBox.visible = true;
        ring.visible = true;
        camera.position.z = 3;
    }
    
    // Scene 6: Response (90-100%)
    else if (scrollPercent >= 0.9) {
        showSceneOverlay('scene-6');
    }
}

function showSceneOverlay(sceneId) {
    document.querySelectorAll('.scene-overlay').forEach(overlay => {
        overlay.classList.remove('active');
    });
    
    const overlay = document.getElementById(sceneId);
    if (overlay) {
        overlay.classList.add('active');
        console.log('Showing scene:', sceneId);
    } else {
        console.log('Scene not found:', sceneId);
    }
}

function setupCustomization() {
    const customizeBtn = document.getElementById('customize-btn');
    const customizeModal = document.getElementById('customize-modal');
    const closeModal = document.getElementById('close-modal');
    const generateLinkBtn = document.getElementById('generate-link');
    const copyLinkBtn = document.getElementById('copy-link');
    
    // Pre-fill form with current config
    const yourNameInput = document.getElementById('your-name');
    const partnerNameInput = document.getElementById('partner-name');
    const questionInput = document.getElementById('proposal-question-input');
    const messageInput = document.getElementById('proposal-message');
    
    if (config.names) {
        yourNameInput.value = config.names.yourName || '';
        partnerNameInput.value = config.names.herName || '';
    }
    if (config.proposal) {
        questionInput.value = config.proposal.question || '';
        messageInput.value = config.proposal.subtitle || '';
    }
    
    // Open modal
    customizeBtn.addEventListener('click', () => {
        customizeModal.classList.remove('hidden');
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        customizeModal.classList.add('hidden');
    });
    
    // Close on background click
    customizeModal.addEventListener('click', (e) => {
        if (e.target === customizeModal) {
            customizeModal.classList.add('hidden');
        }
    });
    
    // Generate shareable link
    generateLinkBtn.addEventListener('click', () => {
        const baseUrl = window.location.origin + window.location.pathname;
        const params = new URLSearchParams();
        
        if (yourNameInput.value) params.set('yourName', yourNameInput.value);
        if (partnerNameInput.value) params.set('partnerName', partnerNameInput.value);
        if (questionInput.value) params.set('question', questionInput.value);
        if (messageInput.value) params.set('message', messageInput.value);
        
        const shareableUrl = `${baseUrl}?${params.toString()}`;
        
        document.getElementById('generated-link').value = shareableUrl;
        document.getElementById('generated-link-container').classList.remove('hidden');
    });
    
    // Copy link to clipboard
    copyLinkBtn.addEventListener('click', () => {
        const linkInput = document.getElementById('generated-link');
        linkInput.select();
        document.execCommand('copy');
        
        copyLinkBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyLinkBtn.textContent = '📋 Copy Link';
        }, 2000);
    });
}

function setupEventListeners() {
    // Scroll event
    window.addEventListener('scroll', () => {
        scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        updateMusicByScroll();
    });

    // Resize event
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Audio controls
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');

    playPauseBtn.addEventListener('click', toggleAudio);
    volumeSlider.addEventListener('input', (e) => {
        if (gainNode) {
            gainNode.gain.value = e.target.value / 100;
        }
    });

    // Yes button
    document.getElementById('yes-btn').addEventListener('click', showCelebration);
    
    // Download button
    document.getElementById('download-btn').addEventListener('click', downloadCelebration);

    // Ring box click
    document.addEventListener('click', (e) => {
        if (ringBox.visible && ringBox.visible) {
            // Check if clicked near center (ring box position)
            const rect = renderer.domElement.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            
            if (Math.abs(x) < 0.3 && Math.abs(y) < 0.3) {
                openRingBox();
            }
        }
    });

    // Mouse move for particle interaction
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        
        heartParticles.forEach(system => {
            system.rotation.x = mouseY * 0.1;
            system.rotation.y = mouseX * 0.1;
        });
    });
}

function toggleAudio() {
    const btn = document.getElementById('play-pause-btn');
    const icon = btn.querySelector('.icon');
    
    if (!audioContext) {
        initAudio();
    }
    
    if (isPlaying) {
        audioContext.suspend();
        icon.textContent = '▶';
        isPlaying = false;
    } else {
        audioContext.resume();
        icon.textContent = '⏸';
        isPlaying = true;
    }
}

function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Load the first song with autoplay
    currentTrack = 0;
    const audio = new Audio(playlist[currentTrack].file);
    audio.loop = true;
    audio.autoplay = true;
    audio.muted = false;
    audio.volume = 0.5;
    audio.preload = 'auto';
    
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.5;
    
    const source = audioContext.createMediaElementSource(audio);
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Store audio reference
    window.currentAudio = audio;
    
    // Try multiple strategies to auto-play
    const attemptAutoplay = async () => {
        try {
            // Resume audio context if suspended
            if (audioContext.state === 'suspended') {
                await audioContext.resume();
            }
            
            // Strategy 1: Direct play
            await audio.play();
            console.log('Audio auto-played successfully');
            isPlaying = true;
            const icon = document.querySelector('#play-pause-btn .icon');
            if (icon) icon.textContent = '⏸';
        } catch (error) {
            console.log('Auto-play failed:', error.message);
            
            // Strategy 2: Try with muted first, then unmute
            try {
                audio.muted = true;
                await audio.play();
                console.log('Audio playing muted, will unmute on interaction');
                isPlaying = true;
                
                // Unmute on first interaction
                const unmuteHandler = () => {
                    audio.muted = false;
                    console.log('Audio unmuted');
                };
                document.addEventListener('click', unmuteHandler, { once: true });
                
                const icon = document.querySelector('#play-pause-btn .icon');
                if (icon) icon.textContent = '⏸';
            } catch (e) {
                console.log('Even muted autoplay failed:', e.message);
                
                // Strategy 3: Fallback to first interaction
                document.addEventListener('click', () => {
                    if (audioContext.state === 'suspended') {
                        audioContext.resume();
                    }
                    if (!isPlaying) {
                        audio.play();
                        isPlaying = true;
                        const icon = document.querySelector('#play-pause-btn .icon');
                        if (icon) icon.textContent = '⏸';
                    }
                }, { once: true });
            }
        }
    };
    
    // Attempt autoplay immediately
    attemptAutoplay();
    
    // Also try when window loads
    window.addEventListener('load', attemptAutoplay, { once: true });
    
    // Also try when page becomes visible
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && !isPlaying) {
            attemptAutoplay();
        }
    });
}

function playTone() {
    // Demo tone - replace with actual music files
    const oscillator = audioContext.createOscillator();
    const noteGain = audioContext.createGain();
    
    oscillator.connect(noteGain);
    noteGain.connect(gainNode);
    
    oscillator.frequency.value = 440;
    oscillator.type = 'sine';
    
    noteGain.gain.setValueAtTime(0.1, audioContext.currentTime);
    noteGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);
}

function updateMusicByScroll() {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const trackIndex = Math.floor(scrollPercent * playlist.length);
    
    if (trackIndex !== currentTrack && trackIndex < playlist.length && trackIndex >= 0) {
        currentTrack = trackIndex;
        const nowPlaying = document.getElementById('now-playing');
        nowPlaying.textContent = `♪ ${playlist[currentTrack].title} - ${playlist[currentTrack].artist}`;
        
        // Crossfade to next track
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio = new Audio(playlist[currentTrack].file);
            window.currentAudio.loop = true;
            window.currentAudio.play();
        }
    }
}

function openRingBox() {
    // Animate ring box opening
    gsap.to(ringBox.rotation, {
        x: -Math.PI / 4,
        duration: 1,
        ease: "power2.out"
    });
    
    gsap.to(ring.position, {
        y: 1,
        duration: 1,
        delay: 0.5,
        ease: "power2.out"
    });
    
    // Create particle explosion
    createConfetti();
}

function createConfetti() {
    const confettiCount = 500;
    const colors = [0xFF1744, 0xF50057, 0xFFD700, 0xFF69B4, 0xFFFFFF];
    
    for (let i = 0; i < confettiCount; i++) {
        const geometry = new THREE.PlaneGeometry(0.05, 0.05);
        const material = new THREE.MeshBasicMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            side: THREE.DoubleSide
        });
        
        const confetti = new THREE.Mesh(geometry, material);
        confetti.position.set(
            (Math.random() - 0.5) * 2,
            0,
            (Math.random() - 0.5) * 2
        );
        confetti.userData = {
            velocity: {
                x: (Math.random() - 0.5) * 0.2,
                y: Math.random() * 0.3 + 0.1,
                z: (Math.random() - 0.5) * 0.2
            },
            rotation: {
                x: Math.random() * 0.1,
                y: Math.random() * 0.1,
                z: Math.random() * 0.1
            }
        };
        
        scene.add(confetti);
        confettiParticles.push(confetti);
    }
    
    // Animate confetti
    animateConfetti();
}

function animateConfetti() {
    confettiParticles.forEach(confetti => {
        confetti.position.x += confetti.userData.velocity.x;
        confetti.position.y += confetti.userData.velocity.y;
        confetti.position.z += confetti.userData.velocity.z;
        
        confetti.rotation.x += confetti.userData.rotation.x;
        confetti.rotation.y += confetti.userData.rotation.y;
        confetti.rotation.z += confetti.userData.rotation.z;
        
        confetti.userData.velocity.y -= 0.005; // Gravity
    });
    
    // Remove confetti that falls below
    confettiParticles = confettiParticles.filter(c => c.position.y > -10);
    
    if (confettiParticles.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

function showCelebration() {
    const celebrationScreen = document.getElementById('celebration-screen');
    celebrationScreen.classList.remove('hidden');
    
    // Create massive confetti explosion
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createConfetti(), i * 200);
    }
    
    // Create fireworks
    createFireworks();
    
    // Populate love letter from config
    const loveLetter = document.getElementById('love-letter');
    const letterConfig = config.celebration?.loveLetter || {};
    const names = config.names || { yourName: 'Rohit', herName: 'Sonam' };
    
    loveLetter.innerHTML = `
        <p>${letterConfig.greeting || 'My Dearest'} ${names.herName},</p>
        <p>${(letterConfig.message || '').replace(/\n/g, '</p><p>')}</p>
        <p style="margin-top: 30px;">${letterConfig.closing || 'With all my love,'}<br>${names.yourName} 💍</p>
    `;
}

function createFireworks() {
    const fireworkCount = 10;
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            const x = (Math.random() - 0.5) * 10;
            const y = Math.random() * 5 + 2;
            const z = (Math.random() - 0.5) * 5;
            
            createFirework(x, y, z);
        }, i * 500);
    }
}

function createFirework(x, y, z) {
    const particleCount = 100;
    const colors = [0xFF1744, 0xF50057, 0xFFD700, 0xFF69B4];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(0.02);
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 1
        });
        
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(x, y, z);
        
        const angle = (i / particleCount) * Math.PI * 2;
        const speed = Math.random() * 0.1 + 0.05;
        
        particle.userData = {
            velocity: {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed,
                z: (Math.random() - 0.5) * speed
            },
            opacity: 1
        };
        
        scene.add(particle);
        fireworks.push(particle);
    }
    
    animateFireworks();
}

function animateFireworks() {
    fireworks.forEach(particle => {
        particle.position.x += particle.userData.velocity.x;
        particle.position.y += particle.userData.velocity.y;
        particle.position.z += particle.userData.velocity.z;
        
        particle.userData.velocity.y -= 0.002;
        particle.userData.opacity -= 0.01;
        particle.material.opacity = particle.userData.opacity;
    });
    
    // Remove faded particles
    fireworks = fireworks.filter(p => p.userData.opacity > 0);
    
    if (fireworks.length > 0) {
        requestAnimationFrame(animateFireworks);
    }
}

function downloadCelebration() {
    // Create a simple download
    const link = document.createElement('a');
    link.download = 'our-proposal.png';
    link.href = renderer.domElement.toDataURL('image/png');
    link.click();
}

function populateMemories() {
    const timeline = document.getElementById('memory-timeline');
    
    memories.forEach(memory => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `
            <div class="memory-date">${memory.date}</div>
            <div class="memory-title">${memory.title}</div>
            <div class="memory-desc">${memory.desc}</div>
        `;
        
        card.addEventListener('click', () => {
            card.style.transform = 'scale(1.1)';
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
        });
        
        timeline.appendChild(card);
    });
}

function simulateLoading() {
    console.log('Starting loading simulation...');
    const progressFill = document.querySelector('.progress-fill');
    const loadingScreen = document.getElementById('loading-screen');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            console.log('Loading complete, dismissing screen...');
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    console.log('Loading screen dismissed');
                    // Show first scene overlay
                    showSceneOverlay('scene-1');
                }, 1000);
            }, 500);
        }
        
        progressFill.style.width = progress + '%';
    }, 200);
}
