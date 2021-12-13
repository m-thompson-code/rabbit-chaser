module.exports = {
  testEnvironment: "node",
  testMatch: ["**/+(*.)+(spec|test).+(ts|js)?(x)"],
  maxWorkers: 1,
  coverageReporters: ["html"],
  collectCoverage: true,
};
