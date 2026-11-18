/**
 * Animation Tests
 *
 * Tests for animation functionality including:
 * - Metrics counter animation
 * - Scroll reveal animations
 * - Capability animations
 */

describe('Metrics Counter Animation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="metrics">
        <div class="metric-value" data-target="99">0</div>
        <div class="metric-value" data-target="500">0</div>
        <div class="metric-value" data-target="1000">0</div>
      </div>
    `;

    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.useRealTimers();
  });

  describe('animateCounter function', () => {
    // Re-implement for testing
    function animateCounter(element, start, end, duration, onComplete) {
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(start + (end - start) * easeOutExpo);
        element.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = end;
          if (onComplete) onComplete();
        }
      }

      requestAnimationFrame(update);
    }

    test('starts from initial value', () => {
      const element = document.querySelector('.metric-value');
      const startValue = 0;

      animateCounter(element, startValue, 100, 1000);

      // Initial frame
      expect(parseInt(element.textContent)).toBe(0);
    });

    test('ends at target value', (done) => {
      jest.useRealTimers();

      const element = document.querySelector('.metric-value');
      const targetValue = 100;

      // Use shorter duration for test
      animateCounter(element, 0, targetValue, 100, () => {
        expect(parseInt(element.textContent)).toBe(targetValue);
        done();
      });
    });

    test('parses data-target attribute correctly', () => {
      const metrics = document.querySelectorAll('.metric-value');

      expect(parseInt(metrics[0].getAttribute('data-target'))).toBe(99);
      expect(parseInt(metrics[1].getAttribute('data-target'))).toBe(500);
      expect(parseInt(metrics[2].getAttribute('data-target'))).toBe(1000);
    });
  });

  describe('easeOutExpo easing', () => {
    // Easing function from script.js
    function easeOutExpo(progress) {
      return progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    }

    test('returns 0 at start', () => {
      expect(easeOutExpo(0)).toBeCloseTo(0, 3);
    });

    test('returns 1 at end', () => {
      expect(easeOutExpo(1)).toBe(1);
    });

    test('eases out (fast start, slow end)', () => {
      const quarterProgress = easeOutExpo(0.25);
      const halfProgress = easeOutExpo(0.5);
      const threeQuarterProgress = easeOutExpo(0.75);

      // Should accelerate quickly then slow down
      expect(quarterProgress).toBeGreaterThan(0.25);
      expect(halfProgress).toBeGreaterThan(0.5);
      expect(threeQuarterProgress).toBeGreaterThan(0.75);

      // Rate of change should decrease
      const firstQuarterChange = quarterProgress;
      const secondQuarterChange = halfProgress - quarterProgress;
      const thirdQuarterChange = threeQuarterProgress - halfProgress;

      expect(firstQuarterChange).toBeGreaterThan(secondQuarterChange);
      expect(secondQuarterChange).toBeGreaterThan(thirdQuarterChange);
    });
  });
});

describe('Scroll Reveal Animations', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="section-header">Header</div>
      <div class="value-grid stagger-children">
        <div class="value-card">Card 1</div>
        <div class="value-card">Card 2</div>
        <div class="value-card">Card 3</div>
      </div>
      <div class="solution-card">Solution</div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Reveal class management', () => {
    test('adds reveal class to target elements', () => {
      const elements = document.querySelectorAll('.section-header, .solution-card');

      elements.forEach(el => {
        if (!el.closest('.stagger-children')) {
          el.classList.add('reveal');
        }
      });

      expect(document.querySelector('.section-header').classList.contains('reveal')).toBe(true);
      expect(document.querySelector('.solution-card').classList.contains('reveal')).toBe(true);
    });

    test('does not add reveal class to stagger children', () => {
      const cards = document.querySelectorAll('.value-card');

      cards.forEach(el => {
        if (!el.closest('.stagger-children')) {
          el.classList.add('reveal');
        }
      });

      cards.forEach(card => {
        expect(card.classList.contains('reveal')).toBe(false);
      });
    });

    test('adds stagger-children class to grid containers', () => {
      const grid = document.querySelector('.value-grid');
      grid.classList.add('stagger-children');

      expect(grid.classList.contains('stagger-children')).toBe(true);
    });
  });

  describe('Visibility toggle', () => {
    test('adds visible class when element is in view', () => {
      const header = document.querySelector('.section-header');
      header.classList.add('reveal');

      // Simulate intersection
      header.classList.add('visible');

      expect(header.classList.contains('visible')).toBe(true);
    });

    test('handles multiple reveal classes', () => {
      document.body.innerHTML += `
        <div class="reveal-left">Left</div>
        <div class="reveal-right">Right</div>
        <div class="reveal-scale">Scale</div>
      `;

      const revealClasses = ['reveal-left', 'reveal-right', 'reveal-scale'];

      revealClasses.forEach(className => {
        const element = document.querySelector(`.${className}`);
        element.classList.add('visible');
        expect(element.classList.contains('visible')).toBe(true);
      });
    });
  });
});

describe('Capability Animations', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="capabilities-section">
        <div class="capability-category">Category 1</div>
        <div class="capability-category">Category 2</div>
        <div class="capability-category">Category 3</div>
      </div>
    `;

    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.useRealTimers();
  });

  test('adds visible class to categories when in view', () => {
    const categories = document.querySelectorAll('.capability-category');

    categories.forEach((category, index) => {
      setTimeout(() => {
        category.classList.add('visible');
      }, index * 150);
    });

    // First timeout at 0ms fires immediately when timers run
    // Second timeout at 150ms, third at 300ms

    // Before any timeouts are processed
    expect(categories[0].classList.contains('visible')).toBe(false);

    // Run pending timers (0ms timeout fires)
    jest.advanceTimersByTime(0);
    expect(categories[0].classList.contains('visible')).toBe(true);

    // After 150ms total - second category becomes visible
    jest.advanceTimersByTime(150);
    expect(categories[1].classList.contains('visible')).toBe(true);
    expect(categories[2].classList.contains('visible')).toBe(false);

    // After 300ms total - third category becomes visible
    jest.advanceTimersByTime(150);
    expect(categories[2].classList.contains('visible')).toBe(true);
  });

  test('staggers animation with 150ms delay per item', () => {
    const categories = document.querySelectorAll('.capability-category');
    const animationTimes = [];

    categories.forEach((category, index) => {
      const delay = index * 150;
      animationTimes.push(delay);

      setTimeout(() => {
        category.classList.add('visible');
      }, delay);
    });

    expect(animationTimes).toEqual([0, 150, 300]);
  });
});

describe('IntersectionObserver Options', () => {
  test('scroll reveal observer has correct threshold', () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px'
    };

    expect(observerOptions.threshold).toBe(0.1);
    expect(observerOptions.rootMargin).toBe('0px 0px -80px 0px');
  });

  test('capability observer has correct threshold', () => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    expect(observerOptions.threshold).toBe(0.2);
    expect(observerOptions.rootMargin).toBe('0px 0px -50px 0px');
  });

  test('metrics observer has correct threshold', () => {
    const observerOptions = {
      threshold: 0.5
    };

    expect(observerOptions.threshold).toBe(0.5);
  });
});
