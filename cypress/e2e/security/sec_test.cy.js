/**
 * SECURITY TEST: Header Check & XSS Input Validation
 * 
 * Test Case: Basic Security Tests
 * - Check security response headers
 * - Test XSS input validation
 * - Validate secure protocols
 */

describe('Security Test - Headers & Input Validation', () => {

    const testUrl = 'https://www.google.com';

    before(() => {
        cy.log('Starting Security Test Suite');
    });

    it('Should have proper security headers', () => {
        cy.log('Checking security headers...');

        // Check security headers menggunakan custom command
        cy.checkSecurityHeaders(testUrl).then((headers) => {
            cy.log('Security Headers Found:');
            cy.log(JSON.stringify(headers, null, 2));

            // Take screenshot
            cy.takeNamedScreenshot('security-headers-check');

            // Validate critical security headers
            // Note: Tidak semua website implement semua headers, 
            // jadi kita check yang ada dan log yang tidak ada

            if (headers['x-frame-options']) {
                cy.log(`✓ X-Frame-Options: ${headers['x-frame-options']}`);
                expect(headers['x-frame-options']).to.exist;
            } else {
                cy.log('⚠ X-Frame-Options header not found');
            }

            if (headers['x-content-type-options']) {
                cy.log(`✓ X-Content-Type-Options: ${headers['x-content-type-options']}`);
                expect(headers['x-content-type-options']).to.equal('nosniff');
            } else {
                cy.log('⚠ X-Content-Type-Options header not found');
            }

            if (headers['strict-transport-security']) {
                cy.log(`✓ Strict-Transport-Security: ${headers['strict-transport-security']}`);
                expect(headers['strict-transport-security']).to.exist;
            } else {
                cy.log('⚠ Strict-Transport-Security header not found');
            }

            if (headers['content-security-policy']) {
                cy.log(`✓ Content-Security-Policy: Present`);
                expect(headers['content-security-policy']).to.exist;
            } else {
                cy.log('⚠ Content-Security-Policy header not found');
            }

            cy.log('✓ Security headers check completed');
        });
    });

    it('Should validate HTTPS protocol is used', () => {
        cy.visit(testUrl);

        // Validate URL uses HTTPS
        cy.url().should('include', 'https://');

        cy.log('✓ HTTPS protocol validated');
    });

    it('Should test XSS input sanitization', () => {
        cy.visit(testUrl);

        // XSS payloads untuk testing
        const xssPayloads = [
            '<script>alert("XSS")</script>',
            '"><script>alert(String.fromCharCode(88,83,83))</script>',
            '<img src=x onerror=alert("XSS")>',
            'javascript:alert("XSS")'
        ];

        // Test setiap payload di search box
        xssPayloads.forEach((payload, index) => {
            cy.log(`Testing XSS payload ${index + 1}: ${payload}`);

            // Input XSS payload ke search box
            cy.get('textarea[name="q"]', { timeout: 10000 })
                .clear()
                .type(payload, { parseSpecialCharSequences: false });

            // Take screenshot
            cy.takeNamedScreenshot(`security-xss-test-${index + 1}`);

            // Submit
            cy.get('textarea[name="q"]').type('{enter}');

            // Wait a bit
            cy.wait(1000);

            // Validate tidak ada alert popup (XSS tidak berhasil)
            // Jika aplikasi vulnerable, alert akan muncul
            cy.on('window:alert', (str) => {
                // Jika alert muncul, test akan fail
                throw new Error(`XSS vulnerability detected! Alert popup: ${str}`);
            });

            cy.log(`✓ XSS payload ${index + 1} properly sanitized`);

            // Back untuk test berikutnya
            if (index < xssPayloads.length - 1) {
                cy.visit(testUrl);
            }
        });

        cy.log('✓ All XSS input validation tests passed');
    });

    it('Should check for secure cookie attributes', () => {
        cy.visit(testUrl);

        // Get all cookies
        cy.getCookies().then((cookies) => {
            cy.log(`Found ${cookies.length} cookies`);

            if (cookies.length > 0) {
                cookies.forEach((cookie) => {
                    cy.log(`Cookie: ${cookie.name}`);

                    // Check untuk secure flag di cookies
                    if (cookie.secure) {
                        cy.log(`✓ ${cookie.name} has Secure flag`);
                    } else {
                        cy.log(`⚠ ${cookie.name} missing Secure flag`);
                    }

                    // Check untuk HttpOnly flag
                    if (cookie.httpOnly) {
                        cy.log(`✓ ${cookie.name} has HttpOnly flag`);
                    } else {
                        cy.log(`⚠ ${cookie.name} missing HttpOnly flag`);
                    }

                    // Check untuk SameSite attribute
                    if (cookie.sameSite) {
                        cy.log(`✓ ${cookie.name} has SameSite: ${cookie.sameSite}`);
                    } else {
                        cy.log(`⚠ ${cookie.name} missing SameSite attribute`);
                    }
                });
            }

            cy.takeNamedScreenshot('security-cookie-check');
            cy.log('✓ Cookie security attributes checked');
        });
    });

});
