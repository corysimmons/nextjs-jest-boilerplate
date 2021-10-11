/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  transformIgnorePatterns: ["/node_modules/"],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "\\.[jt]sx?$": ["babel-jest", { presets: ["next/babel"] }],
  },
  testURL: "http://localhost:3000/",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
};