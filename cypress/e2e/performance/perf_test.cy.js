/**
 * PERFORMANCE TEST: TTFB & Performance Metrics
 * 
 * Test Case: Performance Metrics
 * - Check TTFB (Time To First Byte) < 500ms
 * - Measure comprehensive performance metrics
 * - Calculate performance score
 */

// Helper function to calculate performance score
function calculatePerformanceScore(metrics) {
    let score = 100;

    // Deduct points based on metrics
    if (metrics.ttfb > 200) score -= (metrics.ttfb - 200) / 20;
    if (metrics.domContentLoaded > 1500) score -= (metrics.domContentLoaded - 1500) / 100;
    if (metrics.pageLoad > 3000) score -= (metrics.pageLoad - 3000) / 100;

    return Math.max(0, Math.min(100, Math.round(score)));
}

describe('Performance Test - TTFB & Metrics', () => {

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

    it('Should measure comprehensive page performance metrics', () => {
        // Visit halaman yang akan diaudit
        cy.visit(testUrl);

        // Wait untuk page sepenuhnya load
        cy.wait(2000);

        // Measure performance menggunakan window.performance API
        cy.window().then((win) => {
            const perfData = win.performance.timing;

            // Calculate various metrics
            const metrics = {
                // Time To First Byte
                ttfb: perfData.responseStart - perfData.requestStart,

                // DOM Interactive
                domInteractive: perfData.domInteractive - perfData.navigationStart,

                // DOM Content Loaded
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,

                // Full Page Load
                pageLoad: perfData.loadEventEnd - perfData.navigationStart,

                // DNS Lookup Time
                dnsLookup: perfData.domainLookupEnd - perfData.domainLookupStart,

                // TCP Connection Time
                tcpConnection: perfData.connectEnd - perfData.connectStart,

                // Server Response Time
                serverResponse: perfData.responseEnd - perfData.requestStart
            };

            // Log all metrics
            cy.log('=== Performance Metrics ===');
            cy.log(`TTFB: ${metrics.ttfb}ms`);
            cy.log(`DOM Interactive: ${metrics.domInteractive}ms`);
            cy.log(`DOM Content Loaded: ${metrics.domContentLoaded}ms`);
            cy.log(`Full Page Load: ${metrics.pageLoad}ms`);
            cy.log(`DNS Lookup: ${metrics.dnsLookup}ms`);
            cy.log(`TCP Connection: ${metrics.tcpConnection}ms`);
            cy.log(`Server Response: ${metrics.serverResponse}ms`);

            // Take screenshot
            cy.takeNamedScreenshot('performance-metrics');

            // Performance assertions
            expect(metrics.ttfb, 'TTFB').to.be.lessThan(500);
            expect(metrics.domContentLoaded, 'DOM Content Loaded').to.be.lessThan(3000);
            expect(metrics.pageLoad, 'Page Load Time').to.be.lessThan(5000);
            expect(metrics.serverResponse, 'Server Response').to.be.lessThan(1000);

            cy.log('✓ All performance metrics within acceptable thresholds');

            // Calculate performance score (simplified)
            const performanceScore = calculatePerformanceScore(metrics);
            cy.log(`Performance Score: ${performanceScore}/100`);

            expect(performanceScore, 'Performance Score').to.be.gte(70);
        });
    });

    it('Should measure page load performance metrics', () => {
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
