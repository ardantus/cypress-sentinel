# Changelog

All notable changes to the Cypress Sentinel project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-01-01

### 🎉 Initial Release

Complete automated testing suite with Cypress running in Docker Compose.

### ✨ Added

#### Core Framework
- **Cypress Testing Framework** (`v13.6.2`)
  - Fully dockerized using `cypress/included` image
  - Headless Chrome browser support
  - Zero local dependencies required

#### Test Modules
- **Functional Testing Module** (`cypress/e2e/functional/`)
  - UI element validation
  - Form interaction testing
  - Search functionality testing
  - Manual screenshot capture at key steps

- **Performance Testing Module** (`cypress/e2e/performance/`)
  - TTFB (Time To First Byte) validation with 500ms threshold
  - Lighthouse audit integration with minimum score of 80
  - Page load metrics (load time, DOM ready, DNS lookup)
  - Performance API integration

- **Security Testing Module** (`cypress/e2e/security/`)
  - Security headers validation (X-Frame-Options, CSP, HSTS, etc.)
  - XSS input sanitization testing with 4 different payloads
  - HTTPS protocol enforcement check
  - Cookie security attributes validation (Secure, HttpOnly, SameSite)

#### Reporting
- **Mochawesome HTML Reporter**
  - Embedded screenshots directly in HTML
  - Inline assets for single-file portability
  - Charts and statistics visualization
  - Detailed test execution logs
  - Email/PDF-ready format

#### Configuration
- **Modular Test Execution**
  - Environment variable `SPEC_PATTERN` for selective test running
  - Run all tests or filter by category (functional/performance/security)
  - `.env.example` template for easy configuration

- **Docker Compose Setup**
  - Volume mounts for local editing
  - Resource limits (2 CPU cores, 4GB memory)
  - Named volumes for node_modules to support proper npm install
  - Headless browser optimization

#### Custom Commands
- `cy.takeNamedScreenshot()` - Manual screenshot with custom naming
- `cy.checkSecurityHeaders()` - Security header validation
- `cy.checkTTFB()` - Time To First Byte measurement
- Lighthouse integration via `cypress-audit` plugin

#### Documentation
- Comprehensive README with:
  - Installation guide
  - Usage instructions
  - Test suite selection guide
  - Report viewing instructions
  - Troubleshooting section
- Detailed CHANGELOG
- `.gitignore` for clean repository
- Project walkthrough documentation

### ⚙️ Configuration

#### Cypress Config (`cypress.config.js`)
- Video recording: **DISABLED** (saves storage space)
- Screenshot on failure: **ENABLED**
- Screenshot folder: `cypress/screenshots/`
- Report folder: `reports/`
- Browser: Chrome (headless mode)

#### Dependencies
- `cypress` (^13.6.2)
- `cypress-mochawesome-reporter` (^3.8.1)
- `cypress-audit` (^1.1.0)
- `lighthouse` (^11.4.0)
- `mochawesome` family (merge & report generator)

### 🎯 Features

- ✅ Ready-to-run framework (no local setup needed)
- ✅ Modular test structure (easy to maintain)
- ✅ Selective test execution (via environment variables)
- ✅ Professional HTML reporting with embedded screenshots
- ✅ Performance testing with Lighthouse
- ✅ Security testing with XSS validation
- ✅ Docker-based consistency across environments
- ✅ Single-file HTML report (portable, email-friendly)

### 📋 Example Test Files

- `cypress/e2e/functional/ui_test.cy.js` - Google search functionality test
- `cypress/e2e/performance/perf_test.cy.js` - TTFB & Lighthouse audit
- `cypress/e2e/security/sec_test.cy.js` - Security headers & XSS testing

### 🐛 Bug Fixes

- Fixed Docker Compose `node_modules` volume mounting issue
  - Changed from local bind mount to named volume
  - Ensures `npm install` works correctly inside container

---

## Project Information

**Repository**: https://github.com/ardantus/cypress-sentinel  
**Author**: Senior QA DevOps Engineer  
**License**: MIT

---

## How to Use

```bash
# Setup
cp .env.example .env

# Run all tests
docker-compose up

# Run specific test suite
SPEC_PATTERN=cypress/e2e/functional/**/*.cy.js docker-compose up

# View report
open reports/index.html
```

For detailed documentation, see [README.md](README.md).
