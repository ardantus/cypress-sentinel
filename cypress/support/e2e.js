// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import Cypress Mochawesome Reporter
import 'cypress-mochawesome-reporter/register';

// Import Cypress Audit untuk Lighthouse
import 'cypress-audit/commands';

// Custom commands
Cypress.Commands.add('takeNamedScreenshot', (name) => {
    cy.screenshot(name, {
        capture: 'fullPage',
        overwrite: true
    });
});

// Command untuk security header check
Cypress.Commands.add('checkSecurityHeaders', (url) => {
    cy.request(url).then((response) => {
        const headers = response.headers;

        // Log all headers untuk debugging
        cy.log('Response Headers:', JSON.stringify(headers));

        // Check untuk common security headers
        const securityHeaders = {
            'x-frame-options': headers['x-frame-options'],
            'x-content-type-options': headers['x-content-type-options'],
            'x-xss-protection': headers['x-xss-protection'],
            'strict-transport-security': headers['strict-transport-security'],
            'content-security-policy': headers['content-security-policy']
        };

        return securityHeaders;
    });
});

// Command untuk check TTFB (Time to First Byte)
Cypress.Commands.add('checkTTFB', (url, maxTTFB = 500) => {
    const startTime = performance.now();

    cy.request(url).then(() => {
        const endTime = performance.now();
        const ttfb = endTime - startTime;

        cy.log(`TTFB: ${ttfb.toFixed(2)}ms`);

        expect(ttfb).to.be.lessThan(maxTTFB);

        return ttfb;
    });
});

// Prevent Cypress from failing on uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
    // Returning false here prevents Cypress from failing the test
    // Hanya untuk demo purposes, dalam production sebaiknya lebih selektif
    console.error('Uncaught exception:', err.message);
    return false;
});
