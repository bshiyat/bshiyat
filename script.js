// =============================================
// [BSHIYAT] >> CYBER_HACKER_JAVASCRIPT
// Matrix Rain | Glitch Effects | Terminal Vibes
// =============================================

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', () => {
    initDynamicSlogan();
    initBootSequence();
    initMatrixRain();
    initDataStreams();
    initNavigation();
    initScrollAnimations();
    initStatsCounter();
    initSmoothScroll();
    initFormHandler();
    initAOS();
    initGlitchEffects();
    initTerminalCursor();
    initDynamicTitle();
});

// ============= DYNAMIC SLOGAN =============
function initDynamicSlogan() {
    const slogans = [
        "Illuminating the Unknown with Intelligent Precision",
        "Crafting Tomorrow's Intelligence Today",
        "Where Vision Meets Intelligent Design",
        "Elegant Intelligence for Enduring Impact",
        "Harmonizing Innovation and Insight",
        "Pioneering Insights, Seamlessly Realized",
        "Intelligence Refined, Futures Defined",
        "Bridging Worlds with Intelligent Elegance"
    ];

    // Select random slogan
    const randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];

    // Display slogan with typing effect
    const sloganElement = document.querySelector('.dynamic-slogan');
    if (sloganElement) {
        typeWriterEffect(sloganElement, randomSlogan, 50);
    }
}

// Typing effect for slogan
function typeWriterEffect(element, text, speed) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 500);
}

// ============= BOOT SEQUENCE =============
function initBootSequence() {
    const bootSequence = document.getElementById('bootSequence');

    // Hide boot sequence after 4 seconds
    setTimeout(() => {
        bootSequence.style.display = 'none';
        // Trigger entrance animations
        document.body.classList.add('loaded');
    }, 4000);
}

// ============= DATA STREAMS =============
function initDataStreams() {
    // Create left data stream
    const leftStream = document.createElement('div');
    leftStream.className = 'data-stream left';
    document.body.appendChild(leftStream);

    // Create right data stream
    const rightStream = document.createElement('div');
    rightStream.className = 'data-stream right';
    document.body.appendChild(rightStream);
}

// ============= DYNAMIC TITLE =============
function initDynamicTitle() {
    const titles = [
        '[BSHIYAT] >> Elite Cyber Solutions_',
        '[BSHIYAT] >> ACCESS_GRANTED_',
        '[BSHIYAT] >> SYSTEM_ACTIVE_',
        '[BSHIYAT] >> WELCOME_HACKER_'
    ];
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % titles.length;
        document.title = titles[currentIndex];
    }, 3000);
}

// ============= MATRIX RAIN EFFECT =============
function initMatrixRain() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>|/\\~`";
    const matrixChars = matrix.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    // Draw matrix rain
    function drawMatrix() {
        // Black BG with fade effect for trail
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00FF00';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Add glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00FF00';

            ctx.fillText(text, x, y);

            // Reset drop to top randomly
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Animation loop
    setInterval(drawMatrix, 35);
}

// ============= GLITCH EFFECTS =============
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch, .glitch-title');

    glitchElements.forEach(element => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.style.textShadow = `
                    ${Math.random() * 10 - 5}px 0 #FF0000,
                    ${Math.random() * 10 - 5}px 0 #00FFFF
                `;
                setTimeout(() => {
                    element.style.textShadow = '';
                }, 50);
            }
        }, 100);
    });
}

// ============= TERMINAL CURSOR =============
function initTerminalCursor() {
    const badges = document.querySelectorAll('.hero-badge');
    badges.forEach(badge => {
        const text = badge.textContent;
        if (!text.includes('█')) return;

        setInterval(() => {
            const cursor = badge.querySelector('.terminal-cursor');
            if (cursor) {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }
        }, 500);
    });
}

// ============= NAVIGATION =============
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll behavior with glitch effect
    let lastScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, 100));

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle?.contains(e.target)) {
            navToggle?.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add hover glitch effect to nav links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (Math.random() > 0.7) {
                link.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                setTimeout(() => {
                    link.style.transform = '';
                }, 100);
            }
        });
    });
}

// ============= SMOOTH SCROLL =============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                // Add a hacker-style scroll effect
                const start = window.pageYOffset;
                const distance = targetPosition - start;
                const duration = 800;
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);

                    // Easing function
                    const ease = progress < 0.5
                        ? 2 * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                    window.scrollTo(0, start + distance * ease);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                requestAnimationFrame(animation);
            }
        });
    });
}

// ============= STATS COUNTER ANIMATION =============
function initStatsCounter() {
    const metricNumbers = document.querySelectorAll('.metric-number');
    const metricProgress = document.querySelectorAll('.metric-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetric(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    metricNumbers.forEach(metric => {
        observer.observe(metric.closest('.metric-card'));
    });

    function animateMetric(card) {
        const number = card.querySelector('.metric-number');
        const progress = card.querySelector('.metric-progress');

        if (!number) return;

        const target = parseInt(number.getAttribute('data-target'));
        const percent = progress.getAttribute('data-percent');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        // Set CSS variable for circle animation
        progress.style.setProperty('--percent', percent);

        // Animate number
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                number.textContent = Math.floor(current);

                // Add glitch effect during count
                if (Math.random() > 0.9) {
                    number.style.opacity = '0.5';
                    setTimeout(() => {
                        number.style.opacity = '1';
                    }, 50);
                }

                requestAnimationFrame(updateCounter);
            } else {
                number.textContent = target;
                // Add unit suffix
                const suffix = number.closest('.metric-card').querySelector('h3').textContent.includes('REQ') ? 'K+' :
                              number.closest('.metric-card').querySelector('h3').textContent.includes('USERS') ? 'K' : '%';
                number.textContent = target + suffix;
            }
        };

        updateCounter();
    }
}

// ============= SCROLL ANIMATIONS (AOS) =============
function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');

                // Add terminal-style entrance effect
                entry.target.style.opacity = '0';
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                }, 50);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ============= ADDITIONAL SCROLL ANIMATIONS =============
function initScrollAnimations() {
    // Smooth parallax effect for entire hero section
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');

        if (heroContent && scrolled < window.innerHeight) {
            // Calculate smooth opacity fade (starts fading at 20% scroll, fully gone at 80%)
            const fadeStart = window.innerHeight * 0.2;
            const fadeEnd = window.innerHeight * 0.8;
            let opacity = 1;

            if (scrolled > fadeStart) {
                opacity = 1 - ((scrolled - fadeStart) / (fadeEnd - fadeStart));
                opacity = Math.max(0, Math.min(1, opacity)); // Clamp between 0 and 1
            }

            // Smooth parallax movement with easing
            const moveAmount = scrolled * 0.5;

            // Apply smooth transitions
            heroContent.style.transition = 'transform 0.1s ease-out, opacity 0.1s ease-out';
            heroContent.style.transform = `translateY(${moveAmount}px)`;
            heroContent.style.opacity = opacity;
        }
    }, 16));

    // Section reveal animations
    const sections = document.querySelectorAll('section:not(.hero)');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
}

// ============= FORM HANDLER =============
function initFormHandler() {
    const form = document.getElementById('contactForm');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show terminal-style loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        let dots = 0;
        submitBtn.innerHTML = '<span class="btn-icon">⚡</span> TRANSMITTING';
        submitBtn.disabled = true;

        const loadingInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            submitBtn.innerHTML = `<span class="btn-icon">⚡</span> TRANSMITTING${'.'.repeat(dots)}`;
        }, 200);

        try {
            await simulateFormSubmission(data);
            clearInterval(loadingInterval);
            submitBtn.innerHTML = '<span class="btn-icon">✓</span> TRANSMITTED';

            showNotification('[ SUCCESS ] >> Message transmitted successfully_', 'success');
            form.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } catch (error) {
            clearInterval(loadingInterval);
            showNotification('[ ERROR ] >> Transmission failed. Retry connection_', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // Add terminal-style focus effects
    const inputs = form?.querySelectorAll('input, textarea, select');
    inputs?.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5)';
        });

        input.addEventListener('blur', function() {
            this.style.boxShadow = '';
        });

        // Add typing effect
        input.addEventListener('input', function() {
            if (Math.random() > 0.95) {
                this.style.transform = 'scale(1.01)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            }
        });
    });
}

// Simulate form submission
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        console.log('[TRANSMISSION] >> Data payload:', data);
        setTimeout(resolve, 2000);
    });
}

// ============= NOTIFICATION SYSTEM =============
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    const bgColor = type === 'success'
        ? 'rgba(0, 255, 0, 0.95)'
        : 'rgba(255, 0, 0, 0.95)';

    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: bgColor,
        color: type === 'success' ? '#000' : '#FFF',
        padding: '1rem 1.5rem',
        border: `2px solid ${type === 'success' ? '#00FF00' : '#FF0000'}`,
        boxShadow: `0 0 20px ${type === 'success' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)'}`,
        zIndex: '10000',
        animation: 'slideInRight 0.4s ease, glitchNotif 0.1s 0.5s',
        fontSize: '0.9rem',
        fontWeight: '700',
        fontFamily: "'Orbitron', monospace",
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        maxWidth: '400px',
        textShadow: 'none'
    });

    document.body.appendChild(notification);

    // Glitch effect on notification
    setTimeout(() => {
        notification.style.transform = 'translateX(5px)';
        setTimeout(() => {
            notification.style.transform = '';
        }, 50);
    }, 500);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Add notification animations
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        @keyframes glitchNotif {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .notification-icon {
            font-size: 1.25rem;
            font-weight: bold;
        }
        @media (max-width: 640px) {
            .notification {
                left: 20px !important;
                right: 20px !important;
                max-width: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============= UTILITY FUNCTIONS =============

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============= ACTIVE SECTION HIGHLIGHTING =============
function initActiveSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
}

initActiveSectionHighlight();

// ============= RANDOM GLITCH EFFECTS =============
setInterval(() => {
    const cards = document.querySelectorAll('.solution-card, .stat-card, .why-card');
    const randomCard = cards[Math.floor(Math.random() * cards.length)];

    if (randomCard && Math.random() > 0.95) {
        randomCard.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        randomCard.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.8)';

        setTimeout(() => {
            randomCard.style.transform = '';
            randomCard.style.boxShadow = '';
        }, 100);
    }
}, 3000);

// ============= BUTTON EFFECTS =============
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.8)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = '';
    });

    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============= TYPING EFFECT FOR HERO BADGE =============
function typeWriter(element, text, speed = 50) {
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

// ============= CONSOLE MESSAGES =============
console.log('%c[BSHIYAT] >> SYSTEM_INITIALIZED', 'color: #00FF00; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00FF00; font-family: monospace;');
console.log('%c>> ELITE_CYBER_OPERATIONS_ACTIVE', 'color: #39FF14; font-size: 14px; font-family: monospace;');
console.log('%c>> UNAUTHORIZED_ACCESS_WILL_BE_TRACED', 'color: #FF0000; font-size: 12px; font-family: monospace;');
console.log('%c[SYSTEM] >> Looking for elite hackers. Contact form below.', 'color: #00CC00; font-size: 12px; font-family: monospace;');

// ============= CURSOR TRAIL EFFECT =============
const cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #00FF00;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            box-shadow: 0 0 10px #00FF00;
            animation: fadeOutTrail 0.5s ease-out forwards;
        `;

        document.body.appendChild(trail);
        cursorTrail.push(trail);

        if (cursorTrail.length > maxTrailLength) {
            const oldTrail = cursorTrail.shift();
            oldTrail.remove();
        }

        setTimeout(() => trail.remove(), 500);
    }
});

const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes fadeOutTrail {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

// ============= KONAMI CODE EASTER EGG =============
let konamiCode = '';
const konamiSequence = 'bshiyat';

document.addEventListener('keydown', (e) => {
    konamiCode += e.key.toLowerCase();

    if (konamiCode.length > konamiSequence.length) {
        konamiCode = konamiCode.slice(-konamiSequence.length);
    }

    if (konamiCode === konamiSequence) {
        activateHackerMode();
        konamiCode = '';
    }
});

function activateHackerMode() {
    showNotification('[MATRIX_MODE] >> Reality_hacked. Welcome_to_the_system_', 'success');

    // Intense glitch effect
    document.body.style.animation = 'glitchBody 0.1s infinite';

    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);
}

const glitchBodyStyle = document.createElement('style');
glitchBodyStyle.textContent = `
    @keyframes glitchBody {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
`;
document.head.appendChild(glitchBodyStyle);
