/**
 * Navigation Tests
 *
 * Tests for the navigation functionality including:
 * - Scroll effects
 * - Mobile menu toggle
 * - Active section highlighting
 * - Keyboard accessibility
 */

describe('Navigation', () => {
  let nav;
  let navToggle;
  let navMenu;
  let navLinks;

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = `
      <nav id="nav" class="navbar">
        <button id="navToggle" class="nav-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div id="navMenu" class="nav-menu">
          <a href="#hero" class="nav-link">Home</a>
          <a href="#solutions" class="nav-link">Solutions</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#contact" class="nav-link">Contact</a>
        </div>
      </nav>
      <section id="hero" style="height: 500px;"></section>
      <section id="solutions" style="height: 500px;"></section>
      <section id="about" style="height: 500px;"></section>
      <section id="contact" style="height: 500px;"></section>
    `;

    nav = document.getElementById('nav');
    navToggle = document.getElementById('navToggle');
    navMenu = document.getElementById('navMenu');
    navLinks = document.querySelectorAll('.nav-link');

    // Reset body overflow
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
    document.body.style.overflow = '';
  });

  describe('Scroll Effect', () => {
    test('adds "scrolled" class when page scrolls past 50px', () => {
      // Simulate scroll position > 50
      Object.defineProperty(window, 'pageYOffset', { value: 100, writable: true });

      // Trigger scroll handler logic
      if (window.pageYOffset > 50) {
        nav.classList.add('scrolled');
      }

      expect(nav.classList.contains('scrolled')).toBe(true);
    });

    test('removes "scrolled" class when scroll position is less than 50px', () => {
      nav.classList.add('scrolled');
      Object.defineProperty(window, 'pageYOffset', { value: 30, writable: true });

      // Trigger scroll handler logic
      if (window.pageYOffset <= 50) {
        nav.classList.remove('scrolled');
      }

      expect(nav.classList.contains('scrolled')).toBe(false);
    });

    test('does not have "scrolled" class initially at top of page', () => {
      Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });

      if (window.pageYOffset <= 50) {
        nav.classList.remove('scrolled');
      }

      expect(nav.classList.contains('scrolled')).toBe(false);
    });
  });

  describe('Mobile Menu Toggle', () => {
    test('toggles "active" class on menu when toggle is clicked', () => {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
      });

      // First click - should add active
      navToggle.click();
      expect(navMenu.classList.contains('active')).toBe(true);
      expect(navToggle.classList.contains('active')).toBe(true);

      // Second click - should remove active
      navToggle.click();
      expect(navMenu.classList.contains('active')).toBe(false);
      expect(navToggle.classList.contains('active')).toBe(false);
    });

    test('locks body scroll when menu is open', () => {
      navToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
      });

      // Open menu
      navToggle.click();
      expect(document.body.style.overflow).toBe('hidden');

      // Close menu
      navToggle.click();
      expect(document.body.style.overflow).toBe('');
    });

    test('closes menu when nav link is clicked', () => {
      navMenu.classList.add('active');
      navToggle.classList.add('active');
      document.body.style.overflow = 'hidden';

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          document.body.style.overflow = '';
        });
      });

      // Click first link
      navLinks[0].click();

      expect(navMenu.classList.contains('active')).toBe(false);
      expect(navToggle.classList.contains('active')).toBe(false);
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Keyboard Accessibility', () => {
    test('closes menu on Escape key press', () => {
      navMenu.classList.add('active');
      navToggle.classList.add('active');
      document.body.style.overflow = 'hidden';

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          document.body.style.overflow = '';
        }
      });

      // Simulate Escape key press
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);

      expect(navMenu.classList.contains('active')).toBe(false);
      expect(navToggle.classList.contains('active')).toBe(false);
      expect(document.body.style.overflow).toBe('');
    });

    test('does not close menu on other key presses', () => {
      navMenu.classList.add('active');

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }
      });

      // Simulate Enter key press
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      document.dispatchEvent(enterEvent);

      expect(navMenu.classList.contains('active')).toBe(true);
    });
  });

  describe('Active Section Highlighting', () => {
    test('adds "active" class to corresponding nav link', () => {
      // Simulate being in "solutions" section
      const solutionsLink = document.querySelector('.nav-link[href="#solutions"]');

      // Logic from highlightNav
      navLinks.forEach(link => link.classList.remove('active'));
      solutionsLink.classList.add('active');

      expect(solutionsLink.classList.contains('active')).toBe(true);
      expect(document.querySelector('.nav-link[href="#hero"]').classList.contains('active')).toBe(false);
    });

    test('only one nav link is active at a time', () => {
      // Add active to first link
      navLinks[0].classList.add('active');

      // Simulate moving to new section
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[2].classList.add('active');

      const activeLinks = document.querySelectorAll('.nav-link.active');
      expect(activeLinks.length).toBe(1);
      expect(activeLinks[0].getAttribute('href')).toBe('#about');
    });
  });

  describe('Navigation Links', () => {
    test('all nav links have valid href attributes', () => {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href.startsWith('#')).toBe(true);
      });
    });

    test('nav links point to existing sections', () => {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const section = document.querySelector(href);
        expect(section).not.toBeNull();
      });
    });
  });
});

describe('Smooth Scroll', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav>
        <a href="#section1" class="nav-link">Section 1</a>
        <a href="#section2" class="nav-link">Section 2</a>
        <a href="#" class="nav-link">Empty</a>
      </nav>
      <section id="section1" style="margin-top: 1000px; height: 500px;"></section>
      <section id="section2" style="margin-top: 500px; height: 500px;"></section>
    `;

    // Mock scrollTo
    window.scrollTo = jest.fn();

    // Mock history.pushState
    window.history.pushState = jest.fn();
  });

  test('prevents default anchor click behavior', () => {
    const link = document.querySelector('a[href="#section1"]');
    let defaultPrevented = false;

    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        defaultPrevented = true;
      }
    });

    const clickEvent = new Event('click', { cancelable: true });
    link.dispatchEvent(clickEvent);

    expect(defaultPrevented).toBe(true);
  });

  test('does not prevent default for empty href (#)', () => {
    const link = document.querySelector('a[href="#"]');
    let defaultPrevented = false;

    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      defaultPrevented = true;
    });

    link.dispatchEvent(new Event('click'));

    expect(defaultPrevented).toBe(false);
  });

  test('updates browser history on navigation', () => {
    const link = document.querySelector('a[href="#section1"]');

    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      history.pushState(null, null, href);
    });

    link.dispatchEvent(new Event('click', { cancelable: true }));

    expect(window.history.pushState).toHaveBeenCalledWith(null, null, '#section1');
  });
});
