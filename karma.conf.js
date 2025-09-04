module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    reporters: ["progress", "kjhtml", "coverage"],
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage"),
      reporters: [
        { type: "html" },
        { type: "text-summary" }
      ],
      check: {
        global: {
          statements: 30,
          branches: 30,
          functions: 30,
          lines: 30
        }
      }
    }
  });
};
