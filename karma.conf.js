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
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        }
      }
    }
  });
};
