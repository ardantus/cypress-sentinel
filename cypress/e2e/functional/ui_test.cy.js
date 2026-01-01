/**
 * FUNCTIONAL TEST: UI Test Example
 * 
 * Test Case: Google Search Functionality
 * - Buka Google homepage
 * - Ketik keyword di search box
 * - Submit search
 * - Validasi hasil search muncul
 * - Ambil screenshot
 */

describe('Functional Test - UI & Element Validation', () => {

    before(() => {
        cy.log('Starting Functional UI Test Suite');
    });

    it('Should successfully search on Google and validate results', () => {
        // Visit Google homepage
        cy.visit('/', {
            timeout: 30000
        });

        // Take screenshot - Landing page
        cy.takeNamedScreenshot('01-google-homepage');

        // Validasi elemen search box ada
        cy.get('textarea[name="q"]', { timeout: 10000 })
            .should('be.visible')
            .should('be.enabled');

        // Ketik search keyword
        const searchKeyword = 'Cypress automated testing';
        cy.get('textarea[name="q"]')
            .clear()
            .type(searchKeyword, { delay: 100 });

        // Take screenshot - After typing
        cy.takeNamedScreenshot('02-search-input');

        // Submit search (tekan Enter)
        cy.get('textarea[name="q"]').type('{enter}');

        // Wait untuk hasil muncul
        cy.url().should('include', 'search?q=');

        // Take screenshot - Search results
        cy.takeNamedScreenshot('03-search-results');

        // Validasi hasil search muncul
        cy.get('#search', { timeout: 10000 })
            .should('exist')
            .should('be.visible');

        // Validasi ada minimal 1 hasil search
        cy.get('#search')
            .find('div')
            .should('have.length.greaterThan', 0);

        cy.log('✓ UI test completed successfully');
    });

    it('Should validate Google logo is present', () => {
        cy.visit('/');

        // Check logo exists
        cy.get('img[alt*="Google"]', { timeout: 10000 })
            .should('exist')
            .should('be.visible');

        cy.log('✓ Logo validation passed');
    });

    it('Should validate search button is clickable', () => {
        cy.visit('/');

        // Type in search box
        cy.get('textarea[name="q"]')
            .type('Test');

        // Validate search button appears and is clickable
        cy.get('input[value="Google Search"]')
            .first()
            .should('be.visible');

        cy.takeNamedScreenshot('04-search-button-visible');

        cy.log('✓ Search button validation passed');
    });

});
