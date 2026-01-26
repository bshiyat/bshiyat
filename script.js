// =============================================
// BSHIYAT - Professional Enterprise JavaScript
// 3D Globe | Smooth Animations | Modern Interactions
// =============================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initGlobe();
    initNavigation();
    initMetricsCounter();
    initSmoothScroll();
    initFormHandler();
});

// ============= 3D GLOBE =============
function initGlobe() {
    const canvas = document.getElementById('globeCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create globe
    const geometry = new THREE.SphereGeometry(5, 64, 64);

    // Wireframe material for professional look
    const material = new THREE.MeshBasicMaterial({
        color: 0x404040,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add subtle particles around globe
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6a6a6a,
        transparent: true,
        opacity: 0.5
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 12;

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        globe.rotation.y += 0.001;
        globe.rotation.x += 0.0005;

        particlesMesh.rotation.y += 0.0005;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============= NAVIGATION =============
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
}

// ============= METRICS COUNTER =============
function initMetricsCounter() {
    const metrics = document.querySelectorAll('.metric-value');
    let started = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                metrics.forEach(metric => {
                    const target = parseInt(metric.getAttribute('data-target'));
                    animateCounter(metric, 0, target, 2000);
                });
            }
        });
    }, { threshold: 0.5 });

    const metricsSection = document.querySelector('.metrics');
    if (metricsSection) {
        observer.observe(metricsSection);
    }
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        const current = Math.floor(start + (end - start) * easeOutQuart);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end;
        }
    }

    requestAnimationFrame(update);
}

// ============= SMOOTH SCROLL =============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============= FORM HANDLER =============
function initFormHandler() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.style.opacity = '0.6';

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                console.log('Form data:', data);

                // Show success message
                alert('Thank you for your message! We will get back to you soon.');

                // Reset form
                form.reset();

                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
            }, 1500);

            // For actual implementation, replace the setTimeout with:
            /*
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Thank you for your message! We will get back to you soon.');
                    form.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                alert('Sorry, there was an error sending your message. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
            }
            */
        });
    }
}

// ============= SCROLL REVEAL ANIMATIONS =============
// Simple intersection observer for fade-in effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============= UTILITY FUNCTIONS =============
// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
