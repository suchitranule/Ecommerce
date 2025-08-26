module.exports = {
  content: [
    './dist/ecommerce/**/*.html',
    './dist/ecommerce/**/*.js'
  ],
  css: ['./dist/ecommerce/styles.css'],
  safelist: {
    standard: [
      /^btn/,       // keep all Bootstrap buttons
      /^col/,       // grid system
      /^row/,       // row
      /^container/, // container and container-fluid
      /^navbar/,    // navbars
      /^dropdown/,  // dropdown menus
      /^alert/,     // alerts
      /^card/,      // cards
      /^form/,      // forms
    ],
  },
};
