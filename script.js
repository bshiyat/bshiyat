// =============================================
// BSHIYAT - Professional Enterprise JavaScript
// Enhanced Edition v2.0
// 3D Globe | Scroll Animations | Modern Interactions
// =============================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initGlobe();
    initNavigation();
    initSmoothScroll();
    initScrollReveal();
});

// ============= 3D GLOBE (Enhanced) =============
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

    // Create globe with enhanced geometry
    const geometry = new THREE.SphereGeometry(5, 64, 64);

    // Wireframe material for professional look
    const material = new THREE.MeshBasicMaterial({
        color: 0x404040,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Inner glow sphere
    const glowGeometry = new THREE.SphereGeometry(4.8, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x1a1a1a,
        transparent: true,
        opacity: 0.3
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);

    // Add connection lines around globe
    const connectionCount = 30;
    const connections = new THREE.Group();

    for (let i = 0; i < connectionCount; i++) {
        const startLat = (Math.random() - 0.5) * Math.PI;
        const startLng = Math.random() * Math.PI * 2;
        const endLat = (Math.random() - 0.5) * Math.PI;
        const endLng = Math.random() * Math.PI * 2;

        const startPoint = latLngToVector3(startLat, startLng, 5.1);
        const endPoint = latLngToVector3(endLat, endLng, 5.1);

        const curve = new THREE.QuadraticBezierCurve3(
            startPoint,
            new THREE.Vector3(
                (startPoint.x + endPoint.x) / 2 * 1.3,
                (startPoint.y + endPoint.y) / 2 * 1.3,
                (startPoint.z + endPoint.z) / 2 * 1.3
            ),
            endPoint
        );

        const curvePoints = curve.getPoints(20);
        const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const curveMaterial = new THREE.LineBasicMaterial({
            color: 0x404040,
            transparent: true,
            opacity: 0.15
        });

        const line = new THREE.Line(curveGeometry, curveMaterial);
        connections.add(line);
    }
    scene.add(connections);

    // Add subtle particles around globe (enhanced)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const radius = 8 + Math.random() * 12;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        posArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i3 + 2] = radius * Math.cos(phi);
        scaleArray[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0x6a6a6a,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add floating dots on globe surface
    const dotsGeometry = new THREE.BufferGeometry();
    const dotsCount = 200;
    const dotsPositions = new Float32Array(dotsCount * 3);

    for (let i = 0; i < dotsCount; i++) {
        const i3 = i * 3;
        const lat = (Math.random() - 0.5) * Math.PI;
        const lng = Math.random() * Math.PI * 2;
        const pos = latLngToVector3(lat, lng, 5.05);
        dotsPositions[i3] = pos.x;
        dotsPositions[i3 + 1] = pos.y;
        dotsPositions[i3 + 2] = pos.z;
    }

    dotsGeometry.setAttribute('position', new THREE.BufferAttribute(dotsPositions, 3));

    const dotsMaterial = new THREE.PointsMaterial({
        size: 0.08,
        color: 0x9a9a9a,
        transparent: true,
        opacity: 0.8
    });

    const dots = new THREE.Points(dotsGeometry, dotsMaterial);
    globe.add(dots);

    camera.position.z = 12;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        // Smooth mouse follow
        targetX += (mouseX - targetX) * 0.02;
        targetY += (mouseY - targetY) * 0.02;

        globe.rotation.y += 0.001;
        globe.rotation.x = targetY * 0.2;
        globe.rotation.z = targetX * 0.1;

        connections.rotation.y = globe.rotation.y;
        connections.rotation.x = globe.rotation.x;

        particlesMesh.rotation.y += 0.0003;
        particlesMesh.rotation.x += 0.0001;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, 100));
}

// Helper function to convert lat/lng to Vector3
function latLngToVector3(lat, lng, radius) {
    return new THREE.Vector3(
        radius * Math.cos(lat) * Math.cos(lng),
        radius * Math.sin(lat),
        radius * Math.cos(lat) * Math.sin(lng)
    );
}

// ============= NAVIGATION (Enhanced) =============
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect with class toggle
    const handleScroll = throttle(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, 10);

    window.addEventListener('scroll', handleScroll);

    // Trigger initial check
    handleScroll();

    // Mobile menu toggle with body scroll lock
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            // Lock body scroll when menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');

    const highlightNav = throttle(() => {
        const scrollPosition = window.pageYOffset + 150;

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
    }, 50);

    window.addEventListener('scroll', highlightNav);
}

// ============= SCROLL REVEAL ANIMATIONS =============
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-header, .value-card, .solution-card, .industry-card, .stat-item, .contact-feature');
    const staggerContainers = document.querySelectorAll('.value-grid, .solutions-grid, .industries-grid, .about-stats');

    // Add reveal classes
    revealElements.forEach(el => {
        if (!el.closest('.stagger-children')) {
            el.classList.add('reveal');
        }
    });

    // Add stagger animation to grids
    staggerContainers.forEach(container => {
        container.classList.add('stagger-children');
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Optional: Unobserve after animation to improve performance
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach(el => {
        revealObserver.observe(el);
    });
}


// ============= SMOOTH SCROLL (Enhanced) =============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update URL without triggering scroll
                history.pushState(null, null, href);
            }
        });
    });
}


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
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lerp (linear interpolation) for smooth animations
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll percentage
function getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
}
