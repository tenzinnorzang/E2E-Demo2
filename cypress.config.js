const { defineConfig } = require("cypress");

module.exports = defineConfig({
  fixturesFolder: './cypress/fixtures',
  modifyObstructiveCode: false,
  video: true,
  videosFolder: 'web-e2e/videos',
  screenshotsFolder: 'web-e2e/screenshots',
  viewportHeight: 1080,
  viewportWidth: 1980,
  chromeWebSecurity: false,
  watchForFileChanges: false,
  defaultCommandTimeout: 20000,
  retries: 0,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },


    baseUrl: 'https://demo.nopcommerce.com',
    specPattern: './cypress/e2e',
    supportFile: './cypress/support/e2e.js'
  },
});
