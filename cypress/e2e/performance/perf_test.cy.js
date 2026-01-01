/**
 * PERFORMANCE TEST: TTFB & Lighthouse Audit
 * 
 * Test Case: Performance Metrics
 * - Check TTFB (Time To First Byte) < 500ms
 * - Run Lighthouse audit dengan threshold minimum 80
 */

describe('Performance Test - TTFB & Lighthouse', () => {

    const testUrl = 'https://www.google.com';
    const maxTTFB = 500; // milliseconds

    before(() => {
        cy.log('Starting Performance Test Suite');
    });

    it('Should have TTFB less than 500ms', () => {
        cy.log(`Testing TTFB for: ${testUrl}`);

        // Measure TTFB menggunakan custom command
        cy.checkTTFB(testUrl, maxTTFB).then((ttfb) => {
            cy.log(`✓ TTFB: ${ttfb.toFixed(2)}ms (Max allowed: ${maxTTFB}ms)`);

            // Assert TTFB dalam batas
            expect(ttfb).to.be.lessThan(maxTTFB);
        });
    });

    it('Should pass Lighthouse performance audit with score >= 80', () => {
        // Visit halaman yang akan diaudit
        cy.visit(testUrl);

        // Lighthouse thresholds
        const thresholds = {
            performance: 80,
            accessibility: 80,
            'best-practices': 80,
            seo: 80
        };

        // Run Lighthouse audit
        cy.lighthouse(thresholds).then((results) => {
            cy.log('Lighthouse Audit Results:');
            cy.log(`Performance: ${results.performance}`);
            cy.log(`Accessibility: ${results.accessibility}`);
            cy.log(`Best Practices: ${results['best-practices']}`);
            cy.log(`SEO: ${results.seo}`);

            // Take screenshot
            cy.takeNamedScreenshot('performance-lighthouse-audit');

            // Validasi semua scores memenuhi threshold
            expect(results.performance, 'Performance Score').to.be.gte(thresholds.performance);
            expect(results.accessibility, 'Accessibility Score').to.be.gte(thresholds.accessibility);
            expect(results['best-practices'], 'Best Practices Score').to.be.gte(thresholds['best-practices']);
            expect(results.seo, 'SEO Score').to.be.gte(thresholds.seo);

            cy.log('✓ All Lighthouse thresholds passed');
        });
    });

    it('should measure page load performance metrics', () => {
        cy.visit(testUrl);

        // Measure performance menggunakan window.performance API
        cy.window().then((win) => {
            const perfData = win.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
            const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart;

            cy.log(`Page Load Time: ${pageLoadTime}ms`);
            cy.log(`DOM Ready Time: ${domReadyTime}ms`);
            cy.log(`DNS Lookup Time: ${dnsTime}ms`);

            // Assert performance metrics reasonable
            expect(pageLoadTime).to.be.lessThan(10000); // 10 seconds
            expect(domReadyTime).to.be.lessThan(5000); // 5 seconds

            cy.log('✓ Performance metrics within acceptable range');
        });
    });

});
