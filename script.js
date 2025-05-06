// Remove conflicting code
// ... existing code ...
// Canvas Setup
const mainCanvas = document.getElementById('mainCanvas');
const particleCanvas = document.getElementById('particleCanvas');
const mainCtx = mainCanvas.getContext('2d');
const particleCtx = particleCanvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    mainCanvas.width = window.innerWidth;
    mainCanvas.height = window.innerHeight;
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Enhanced Particle System
class Particle {
    constructor(x, y, type = 'normal') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = type === 'normal' ? Math.random() * 3 + 1 : Math.random() * 5 + 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = type === 'normal' 
            ? `hsl(${Math.random() * 60 + 330}, 100%, 50%)`
            : `hsl(${Math.random() * 60 + 280}, 100%, 70%)`;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
        this.opacity = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        if (this.type === 'normal') {
            if (this.size > 0.2) this.size -= 0.1;
        } else {
            this.opacity -= 0.01;
        }
    }

    draw() {
        particleCtx.save();
        particleCtx.translate(this.x, this.y);
        particleCtx.rotate(this.rotation * Math.PI / 180);
        particleCtx.globalAlpha = this.opacity;
        
        if (this.type === 'normal') {
            particleCtx.fillStyle = this.color;
            particleCtx.beginPath();
            particleCtx.arc(0, 0, this.size, 0, Math.PI * 2);
            particleCtx.fill();
        } else {
            particleCtx.fillStyle = this.color;
            particleCtx.beginPath();
            particleCtx.moveTo(0, -this.size);
            particleCtx.lineTo(this.size, this.size);
            particleCtx.lineTo(-this.size, this.size);
            particleCtx.closePath();
            particleCtx.fill();
        }
        
        particleCtx.restore();
    }
}

let particles = [];
let hearts = [];

// Create particles on mouse move
function createParticles(e) {
    const mouseX = e.x;
    const mouseY = e.y;
    
    // Create normal particles
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(mouseX, mouseY, 'normal'));
    }
    
    // Create heart particles occasionally
    if (Math.random() < 0.1) {
        hearts.push(new Particle(mouseX, mouseY, 'heart'));
    }
}

// Animate particles
function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    // Update and draw normal particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
    
    // Update and draw heart particles
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].update();
        hearts[i].draw();
        if (hearts[i].opacity <= 0) {
            hearts.splice(i, 1);
            i--;
        }
    }
    
    requestAnimationFrame(animateParticles);
}

// Enhanced Background Animation
function drawBackground() {
    const gradient = mainCtx.createLinearGradient(0, 0, 0, mainCanvas.height);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(1, '#1a1a1a');
    mainCtx.fillStyle = gradient;
    mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

    // Draw stars with twinkling effect
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * mainCanvas.width;
        const y = Math.random() * mainCanvas.height;
        const size = Math.random() * 2;
        const opacity = 0.5 + Math.sin(Date.now() * 0.001 + i) * 0.5;
        mainCtx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        mainCtx.beginPath();
        mainCtx.arc(x, y, size, 0, Math.PI * 2);
        mainCtx.fill();
    }
}

// Photo Gallery with enhanced transitions
let currentPhoto = 0;
const photoItems = document.querySelectorAll('.photo-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showPhoto(index) {
    photoItems.forEach(item => {
        item.classList.remove('active');
        item.style.transform = 'scale(0.8) rotateY(0deg)';
    });
    
    photoItems[index].classList.add('active');
    photoItems[index].style.transform = 'scale(1) rotateY(0deg)';
}

prevBtn.addEventListener('click', () => {
    currentPhoto = (currentPhoto - 1 + photoItems.length) % photoItems.length;
    showPhoto(currentPhoto);
});

nextBtn.addEventListener('click', () => {
    currentPhoto = (currentPhoto + 1) % photoItems.length;
    showPhoto(currentPhoto);
});

// Enhanced Love Counter Feature
function updateLoveCounter() {
    const startDate = new Date('2024-03-10');
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    gsap.to('#days', {
        innerText: days,
        duration: 1,
        snap: { innerText: 1 },
        ease: 'power1.out'
    });

    gsap.to('#hours', {
        innerText: hours,
        duration: 1,
        snap: { innerText: 1 },
        ease: 'power1.out'
    });

    gsap.to('#minutes', {
        innerText: minutes,
        duration: 1,
        snap: { innerText: 1 },
        ease: 'power1.out'
    });
}

// Enhanced Typing Effect
function typeText(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Enhanced Modal functionality
const modal = document.getElementById('loveModal');
const btn = document.querySelector('.special-message-btn');
const closeBtn = document.querySelector('.close-modal');

btn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add heart burst animation
    const hearts = document.querySelectorAll('.heart-animation');
    hearts.forEach(heart => {
        gsap.to(heart, {
            scale: 1.5,
            duration: 0.5,
            yoyo: true,
            repeat: 1
        });
    });
    
    // Create particle burst
    for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const x = modal.offsetWidth / 2;
        const y = modal.offsetHeight / 2;
        const particle = new Particle(x, y, 'heart');
        particle.speedX = Math.cos(angle) * 5;
        particle.speedY = Math.sin(angle) * 5;
        hearts.push(particle);
    }
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Enhanced Music Player
const musicToggle = document.querySelector('.music-toggle');
const audio = document.getElementById('bgMusic');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicToggle.style.animation = 'none';
    } else {
        audio.play();
        musicToggle.style.animation = 'rotate 3s linear infinite';
    }
    isPlaying = !isPlaying;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateLoveCounter();
    setInterval(updateLoveCounter, 60000); // Update every minute
    animateParticles();
    setInterval(drawBackground, 1000);
    document.addEventListener('mousemove', createParticles);
    
    // Start typing effect
    const typingText = document.querySelector('.typing-text');
    typeText(typingText, typingText.textContent);

    // Show first photo
    showPhoto(0);
    
    // Add floating hearts periodically
    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight;
        const heart = new Particle(x, y, 'heart');
        heart.speedY = -2;
        hearts.push(heart);
    }, 2000);
});