// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Highlight Active Nav Link based on URL
const currentPath = window.location.pathname;
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    
    // Check if the current path includes the href. Also handle the root case for index.html.
    if (currentPath.endsWith(href) || (currentPath.endsWith('/') && href === 'index.html')) {
        item.classList.add('active');
    }
});

// Prevent form submission for demo purposes
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks for reaching out! Since this is a demo, your message wasn\'t actually sent, but you get the idea! 😄');
    });
}

// ==========================================
// Case Study Accordion Logic (Projects Page)
// ==========================================
function toggleCaseStudy(headerElement) {
    const card = headerElement.parentElement;
    const content = card.querySelector('.case-study-content');
    
    // Toggle active class
    card.classList.toggle('active');
    
    if (card.classList.contains('active')) {
        // Expand
        content.style.maxHeight = content.scrollHeight + 60 + "px"; // +60 for padding
    } else {
        // Collapse
        content.style.maxHeight = "0";
    }
}

// ==========================================
// Animated Live Counters (Home Page)
// ==========================================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // Lower is faster

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Calculate increment step
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };

        // Start animation if they are in view (simple check, or just run immediately since it's above fold)
        updateCount();
    });
}

// ==========================================
// Scroll Intersection Observer
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing once faded in
            // observer.unobserve(entry.target);
        } else {
            // Optional: remove visible class if we want it to fade out again when scrolling up
            // entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// ==========================================
// Typing Role Animation (Hero Section)
// ==========================================
const roles = ["I'm a Coder", "I'm a Robot Builder", "I'm an AI Explorer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; 

function typeRole() {
    const roleElement = document.querySelector('.typing-role');
    if (!roleElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeRole, typeSpeed);
}


// Initialize Scripts
document.addEventListener("DOMContentLoaded", function() {
    
    // Run counter animation if counters exist
    if (document.querySelector('.counter')) {
        // Start counter when it comes into view rather than immediately
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        const liveCounters = document.querySelector('.live-counters');
        if (liveCounters) counterObserver.observe(liveCounters);
    }
    
    // Initialize Scroll Fade In
    const fadeElements = document.querySelectorAll('.scroll-fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Start Typing Animation
    if (document.querySelector('.typing-role')) {
        setTimeout(typeRole, 1000);
    }

    // Initialize Particles.js
    if(window.particlesJS && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#00f3ff", "#b026ff"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00f3ff", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }
});
