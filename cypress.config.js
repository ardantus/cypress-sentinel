const { defineConfig } = require('cypress');
const { lighthouse, prepareAudit } = require('cypress-audit');

module.exports = defineConfig({
    e2e: {
        // Base URL untuk testing (bisa diganti sesuai kebutuhan)
        baseUrl: 'https://www.google.com',

        // Browser configuration
        chromeWebSecurity: false,

        // Video Configuration - MATIKAN sesuai requirement
        video: false,

        // Screenshot Configuration - AKTIFKAN
        screenshotOnRunFailure: true,
        screenshotsFolder: 'cypress/screenshots',

        // Viewport default
        viewportWidth: 1280,
        viewportHeight: 720,

        // Timeouts
        defaultCommandTimeout: 10000,
        pageLoadTimeout: 60000,

        // Reporter Configuration - Mochawesome dengan embedded screenshots
        reporter: 'cypress-mochawesome-reporter',
        reporterOptions: {
            reportDir: 'reports',
            charts: true,
            reportPageTitle: 'Cypress Sentinel - Test Report',
            embeddedScreenshots: true,
            inlineAssets: true,
            saveAllAttempts: false,
            saveJson: true,
            saveHtml: true,
            overwrite: false,
            html: true,
            json: true,
            timestamp: 'mmddyyyy_HHMMss'
        },

        // Spec pattern - dapat di-override dengan environment variable
        specPattern: process.env.SPEC_PATTERN || 'cypress/e2e/**/*.cy.js',

        setupNodeEvents(on, config) {
            // Mochawesome reporter plugin
            require('cypress-mochawesome-reporter/plugin')(on);

            // Lighthouse & Audit plugin untuk performance testing
            on('before:browser:launch', (browser = {}, launchOptions) => {
                prepareAudit(launchOptions);

                // Chrome-specific settings untuk headless mode
                if (browser.name === 'chrome' && browser.isHeadless) {
                    launchOptions.args.push('--disable-gpu');
                    launchOptions.args.push('--no-sandbox');
                    launchOptions.args.push('--disable-dev-shm-usage');
                }

                return launchOptions;
            });

            on('task', {
                lighthouse: lighthouse(),

                // Custom task untuk logging
                log(message) {
                    console.log(message);
                    return null;
                }
            });

            return config;
        },
    },
});
