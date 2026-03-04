// ============================================
//  POKÉMON THEMED PORTFOLIO — SCRIPTS
//  Om Vyas | 2026
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initShared();
    initPageSpecific();
});

// ---- SHARED (runs on every page) ----

function initShared() {
    createParticles();
    initNavScroll();
    initMobileNav();
}

// ---- PAGE-SPECIFIC ----

function initPageSpecific() {
    const page = document.body.dataset.page;

    switch (page) {
        case 'home':
            initTypewriter();
            initTrainerCardTilt();
            break;
        case 'skills':
            // Animate skill bars after a short delay
            setTimeout(animateSkillBars, 600);
            break;
    }
}

// ---- Typewriter Effect ----

let typewriterTimeout = null;

function initTypewriter() {
    const target = document.getElementById('typewriter-target');
    if (!target) return;

    // Clear any previous instance
    if (typewriterTimeout) clearTimeout(typewriterTimeout);

    const phrases = [
        'Aspiring Web Developer',
        'Pokémon Enthusiast',
        'Code Trainer in Training',
        'Future Full-Stack Dev',
        'AI Explorer'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 100;

    function type() {
        const phrase = phrases[phraseIndex];

        if (isDeleting) {
            target.textContent = phrase.substring(0, charIndex - 1);
            charIndex--;
            speed = 50;
        } else {
            target.textContent = phrase.substring(0, charIndex + 1);
            charIndex++;
            speed = 100;
        }

        target.style.borderRight = '2px solid var(--poke-yellow)';

        if (!isDeleting && charIndex === phrase.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }

        typewriterTimeout = setTimeout(type, speed);
    }

    type();
}

// ---- Skill Bar Animation ----

let skillBarsAnimated = false;

function animateSkillBars() {
    if (skillBarsAnimated) return;
    skillBarsAnimated = true;

    document.querySelectorAll('.badge-fill').forEach(fill => {
        const level = fill.getAttribute('data-level');
        setTimeout(() => {
            fill.style.width = level + '%';
        }, 300);
    });
}

// Reset skill bars when navigating away (called by router)
function resetSkillBars() {
    skillBarsAnimated = false;
    document.querySelectorAll('.badge-fill').forEach(fill => {
        fill.style.width = '0';
    });
}

// ---- Floating Pokéball Particles ----

function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container || container.children.length > 0) return;

    const count = 15;
    const colors = ['#DC0A2D', '#FFCB05', '#3B5CA8', '#A33EA1', '#6390F0'];

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');

        const size = Math.random() * 20 + 8;
        const left = Math.random() * 100;
        const dur = Math.random() * 15 + 10;
        const delay = Math.random() * 10;
        const color = colors[Math.floor(Math.random() * colors.length)];

        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            background: ${color};
            animation-duration: ${dur}s;
            animation-delay: -${delay}s;
        `;

        if (Math.random() > 0.6) {
            p.style.background = `linear-gradient(to bottom, ${color} 50%, rgba(255,255,255,0.3) 50%)`;
            p.style.border = '1px solid rgba(255,255,255,0.1)';
        }

        container.appendChild(p);
    }
}

// ---- Nav Scroll Effect ----

function initNavScroll() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ---- Mobile Nav Toggle ----

function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
    });
}

// ---- Trainer Card Tilt Effect ----

function initTrainerCardTilt() {
    const card = document.querySelector('.trainer-card');
    if (!card || window.innerWidth <= 768) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (y - rect.height / 2) / (rect.height / 2) * -5;
        const rotateY = (x - rect.width / 2) / (rect.width / 2) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
}

console.log('%c⚡ Gotta Code \'Em All! ⚡', 'color: #FFCB05; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 0 #DC0A2D;');
