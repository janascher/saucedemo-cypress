const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    viewportWidth: 1920, // Largura do viewport em pixels
    viewportHeight: 1080, // Altura do viewport em pixels
    baseUrl: 'https://www.saucedemo.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
