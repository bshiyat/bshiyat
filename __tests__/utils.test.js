/**
 * Utility Functions Tests
 *
 * These tests cover the pure utility functions in script.js.
 * These are ideal candidates for unit testing as they have no side effects.
 */

// Since the script.js doesn't export functions, we need to extract them
// In a real refactor, these would be ES modules

// Re-implement functions for testing (mirrors script.js implementation)
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

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function getScrollPercentage() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return (scrollTop / scrollHeight) * 100;
}

function latLngToVector3(lat, lng, radius) {
  return {
    x: radius * Math.cos(lat) * Math.cos(lng),
    y: radius * Math.sin(lat),
    z: radius * Math.cos(lat) * Math.sin(lng)
  };
}

// ============= TESTS =============

describe('lerp (Linear Interpolation)', () => {
  test('returns start value when factor is 0', () => {
    expect(lerp(0, 100, 0)).toBe(0);
    expect(lerp(50, 150, 0)).toBe(50);
    expect(lerp(-100, 100, 0)).toBe(-100);
  });

  test('returns end value when factor is 1', () => {
    expect(lerp(0, 100, 1)).toBe(100);
    expect(lerp(50, 150, 1)).toBe(150);
    expect(lerp(-100, 100, 1)).toBe(100);
  });

  test('returns midpoint when factor is 0.5', () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(-50, 50, 0.5)).toBe(0);
    expect(lerp(0, 200, 0.5)).toBe(100);
  });

  test('handles negative numbers correctly', () => {
    expect(lerp(-100, 0, 0.5)).toBe(-50);
    expect(lerp(-100, -50, 0.5)).toBe(-75);
  });

  test('handles decimal factors', () => {
    expect(lerp(0, 100, 0.25)).toBe(25);
    expect(lerp(0, 100, 0.75)).toBe(75);
    expect(lerp(0, 100, 0.1)).toBeCloseTo(10);
  });

  test('handles factors outside 0-1 range (extrapolation)', () => {
    expect(lerp(0, 100, 1.5)).toBe(150);
    expect(lerp(0, 100, -0.5)).toBe(-50);
  });
});

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('does not call function immediately', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('calls function after wait time', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    jest.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('only calls function once for multiple rapid calls', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();
    debouncedFn();

    jest.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('resets timer on each call', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    jest.advanceTimersByTime(50);
    debouncedFn();
    jest.advanceTimersByTime(50);

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('passes arguments to debounced function', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('arg1', 'arg2');
    jest.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  });
});

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('calls function immediately on first call', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('ignores calls within throttle period', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn();
    throttledFn();
    throttledFn();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('allows call after throttle period', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn();
    jest.advanceTimersByTime(100);
    throttledFn();

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  test('passes arguments to throttled function', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn('arg1', 'arg2');
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  });
});

describe('latLngToVector3', () => {
  test('converts equator origin correctly', () => {
    const result = latLngToVector3(0, 0, 5);
    expect(result.x).toBeCloseTo(5);
    expect(result.y).toBeCloseTo(0);
    expect(result.z).toBeCloseTo(0);
  });

  test('converts north pole correctly', () => {
    const result = latLngToVector3(Math.PI / 2, 0, 5);
    expect(result.x).toBeCloseTo(0, 5);
    expect(result.y).toBeCloseTo(5, 5);
    expect(result.z).toBeCloseTo(0, 5);
  });

  test('converts south pole correctly', () => {
    const result = latLngToVector3(-Math.PI / 2, 0, 5);
    expect(result.x).toBeCloseTo(0, 5);
    expect(result.y).toBeCloseTo(-5, 5);
    expect(result.z).toBeCloseTo(0, 5);
  });

  test('handles different radii', () => {
    const result1 = latLngToVector3(0, 0, 1);
    const result2 = latLngToVector3(0, 0, 10);

    expect(result1.x).toBeCloseTo(1);
    expect(result2.x).toBeCloseTo(10);
  });

  test('longitude affects x and z coordinates', () => {
    const result = latLngToVector3(0, Math.PI / 2, 5);
    expect(result.x).toBeCloseTo(0, 5);
    expect(result.z).toBeCloseTo(5, 5);
  });

  test('handles negative coordinates', () => {
    const result = latLngToVector3(-Math.PI / 4, -Math.PI / 4, 5);
    expect(typeof result.x).toBe('number');
    expect(typeof result.y).toBe('number');
    expect(typeof result.z).toBe('number');
    expect(isNaN(result.x)).toBe(false);
    expect(isNaN(result.y)).toBe(false);
    expect(isNaN(result.z)).toBe(false);
  });
});

describe('isInViewport', () => {
  beforeEach(() => {
    // Set up window dimensions
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
  });

  test('returns true for element fully in viewport', () => {
    const element = {
      getBoundingClientRect: () => ({
        top: 100,
        left: 100,
        bottom: 200,
        right: 200
      })
    };

    expect(isInViewport(element)).toBe(true);
  });

  test('returns false for element above viewport', () => {
    const element = {
      getBoundingClientRect: () => ({
        top: -100,
        left: 100,
        bottom: -50,
        right: 200
      })
    };

    expect(isInViewport(element)).toBe(false);
  });

  test('returns false for element below viewport', () => {
    const element = {
      getBoundingClientRect: () => ({
        top: 800,
        left: 100,
        bottom: 900,
        right: 200
      })
    };

    expect(isInViewport(element)).toBe(false);
  });

  test('returns false for element left of viewport', () => {
    const element = {
      getBoundingClientRect: () => ({
        top: 100,
        left: -100,
        bottom: 200,
        right: -50
      })
    };

    expect(isInViewport(element)).toBe(false);
  });

  test('returns false for element right of viewport', () => {
    const element = {
      getBoundingClientRect: () => ({
        top: 100,
        left: 1100,
        bottom: 200,
        right: 1200
      })
    };

    expect(isInViewport(element)).toBe(false);
  });

  test('returns true for element at viewport edge', () => {
    const element = {
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        bottom: 768,
        right: 1024
      })
    };

    expect(isInViewport(element)).toBe(true);
  });
});

describe('getScrollPercentage', () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, writable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, writable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 768, writable: true });
  });

  test('returns 0 when at top of page', () => {
    window.pageYOffset = 0;
    expect(getScrollPercentage()).toBe(0);
  });

  test('returns 100 when at bottom of page', () => {
    // scrollHeight - clientHeight = 2000 - 768 = 1232
    window.pageYOffset = 1232;
    expect(getScrollPercentage()).toBe(100);
  });

  test('returns 50 when at middle of page', () => {
    window.pageYOffset = 616; // Half of 1232
    expect(getScrollPercentage()).toBeCloseTo(50, 0);
  });

  test('handles various scroll positions', () => {
    window.pageYOffset = 308; // Quarter of 1232
    expect(getScrollPercentage()).toBeCloseTo(25, 0);

    window.pageYOffset = 924; // Three quarters of 1232
    expect(getScrollPercentage()).toBeCloseTo(75, 0);
  });
});
