module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js'],
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'script.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js']
};
