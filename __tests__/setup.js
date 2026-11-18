// Jest DOM setup
// Mock THREE.js since it's loaded from CDN
global.THREE = {
  Scene: jest.fn(() => ({ add: jest.fn() })),
  PerspectiveCamera: jest.fn(() => ({
    position: { z: 0 },
    aspect: 1,
    updateProjectionMatrix: jest.fn()
  })),
  WebGLRenderer: jest.fn(() => ({
    setSize: jest.fn(),
    setPixelRatio: jest.fn(),
    render: jest.fn()
  })),
  SphereGeometry: jest.fn(),
  MeshBasicMaterial: jest.fn(),
  Mesh: jest.fn(() => ({
    rotation: { x: 0, y: 0, z: 0 },
    add: jest.fn()
  })),
  Group: jest.fn(() => ({
    add: jest.fn(),
    rotation: { x: 0, y: 0, z: 0 }
  })),
  Vector3: jest.fn((x, y, z) => ({ x, y, z })),
  QuadraticBezierCurve3: jest.fn(() => ({
    getPoints: jest.fn(() => [])
  })),
  BufferGeometry: jest.fn(() => ({
    setFromPoints: jest.fn().mockReturnThis(),
    setAttribute: jest.fn()
  })),
  LineBasicMaterial: jest.fn(),
  Line: jest.fn(),
  Float32Array: Float32Array,
  BufferAttribute: jest.fn(),
  PointsMaterial: jest.fn(),
  Points: jest.fn(() => ({
    rotation: { x: 0, y: 0 }
  }))
};

// Mock performance.now for animation tests
global.performance = {
  now: jest.fn(() => Date.now())
};

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 16));
global.cancelAnimationFrame = jest.fn(id => clearTimeout(id));
