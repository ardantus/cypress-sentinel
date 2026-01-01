# Cypress Sentinel - Automated Testing Suite

<div align="center">

**🛡️ Comprehensive E2E Testing Framework**

*Functional • Performance • Security Testing with Docker*

[![Cypress](https://img.shields.io/badge/Cypress-13.6.2-17202C?style=for-the-badge&logo=cypress)](https://www.cypress.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Mochawesome](https://img.shields.io/badge/Report-Mochawesome-green?style=for-the-badge)]()

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Struktur Proyek](#-struktur-proyek)
- [Prasyarat](#-prasyarat)
- [Instalasi & Setup](#-instalasi--setup)
- [Cara Menjalankan Test](#-cara-menjalankan-test)
- [Memilih Test Suite](#-memilih-test-suite)
- [Melihat Report](#-melihat-report)
- [Konfigurasi](#-konfigurasi)
- [Penjelasan Test Modules](#-penjelasan-test-modules)

---

## 🎯 Tentang Proyek

**Cypress Sentinel** adalah framework automated testing yang comprehensive, dirancang untuk menjalankan:

- ✅ **Functional Testing** (UI, Link, Form Validation)
- ⚡ **Performance Testing** (TTFB, Lighthouse Audit)
- 🔒 **Security Testing** (Header Check, XSS Validation)

Semua test berjalan dalam **Docker Container** menggunakan **headless Chrome browser** dan menghasilkan **laporan HTML tunggal** dengan embedded screenshots.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🐳 **Dockerized** | Fully containerized menggunakan `cypress/included` image |
| 📊 **Mochawesome Report** | HTML report dengan embedded screenshots & inline assets |
| 🎭 **Modular Test Structure** | Terpisah berdasarkan kategori: functional, performance, security |
| 🎛️ **Selective Execution** | Pilih test suite via environment variable |
| 📸 **Auto Screenshots** | Screenshot otomatis pada failure + manual trigger |
| 🎬 **No Video Recording** | Video dimatikan untuk menghemat space |
| ⚡ **Lighthouse Integration** | Performance audit dengan threshold scoring |
| 🔐 **Security Audit** | Header validation & XSS testing |

---

## 📁 Struktur Proyek

```
cypress-sentinel/
├── cypress/
│   ├── e2e/
│   │   ├── functional/          # 🟢 Functional Tests
│   │   │   └── ui_test.cy.js
│   │   ├── performance/         # 🟡 Performance Tests
│   │   │   └── perf_test.cy.js
│   │   └── security/            # 🔴 Security Tests
│   │       └── sec_test.cy.js
│   ├── fixtures/                # Test data
│   │   └── example.json
│   ├── screenshots/             # Auto-generated screenshots
│   └── support/
│       ├── commands.js          # Custom commands
│       └── e2e.js               # Global config & plugins
├── reports/                     # 📊 HTML Reports (generated)
├── node_modules/                # Dependencies (auto-installed)
├── .env.example                 # Environment config template
├── cypress.config.js            # Cypress configuration
├── docker-compose.yml           # Docker orchestration
├── package.json                 # NPM dependencies
└── README.md                    # This file
```

---

## 🔧 Prasyarat

Pastikan sistem Anda telah terinstall:

- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)

> ℹ️ **Note**: Tidak perlu install Node.js atau Cypress secara lokal. Semua dependencies akan di-handle oleh Docker container.

---

## 🚀 Instalasi & Setup

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd cypress-sentinel
```

### 2️⃣ Setup Environment Variables

```bash
cp .env.example .env
```

Edit file `.env` sesuai kebutuhan:

```env
# Base URL untuk testing
BASE_URL=https://www.google.com

# Pilih test suite (lihat section "Memilih Test Suite" di bawah)
SPEC_PATTERN=cypress/e2e/**/*.cy.js
```

### 3️⃣ Siap Dijalankan! 🎉

Tidak ada langkah instalasi tambahan. Docker akan mengurus semuanya.

---

## ▶️ Cara Menjalankan Test

### 🐳 Jalankan dengan Docker Compose

```bash
docker-compose up
```

### 📝 Apa yang Terjadi?

1. Docker akan pull image `cypress/included:13.6.2` (jika belum ada)
2. Install NPM dependencies secara otomatis
3. Menjalankan Cypress test dalam headless Chrome
4. Generate laporan HTML di folder `reports/`
5. Container akan stop otomatis setelah test selesai

### 🧹 Clean Up setelah Test

```bash
docker-compose down
```

---

## 🎯 Memilih Test Suite

Anda bisa memilih test mana yang akan dijalankan dengan mengubah environment variable `SPEC_PATTERN` di file `.env`:

### 1️⃣ Jalankan **SEMUA TEST**

```env
SPEC_PATTERN=cypress/e2e/**/*.cy.js
```

```bash
docker-compose up
```

### 2️⃣ Jalankan **FUNCTIONAL TEST ONLY**

```env
SPEC_PATTERN=cypress/e2e/functional/**/*.cy.js
```

```bash
docker-compose up
```

### 3️⃣ Jalankan **PERFORMANCE TEST ONLY**

```env
SPEC_PATTERN=cypress/e2e/performance/**/*.cy.js
```

```bash
docker-compose up
```

### 4️⃣ Jalankan **SECURITY TEST ONLY**

```env
SPEC_PATTERN=cypress/e2e/security/**/*.cy.js
```

```bash
docker-compose up
```

### 5️⃣ Override via Command Line (tanpa edit .env)

```bash
SPEC_PATTERN=cypress/e2e/functional/**/*.cy.js docker-compose up
```

---

## 📊 Melihat Report

### 1️⃣ Lokasi Report

Setelah test selesai, laporan HTML akan tersedia di:

```
reports/
└── index.html
```

### 2️⃣ Membuka Report

**Option A: Langsung buka di browser**

```bash
open reports/index.html
```

atau pada Linux:

```bash
xdg-open reports/index.html
```

**Option B: Via HTTP Server**

```bash
cd reports
python3 -m http.server 8080
```

Kemudian buka: `http://localhost:8080`

### 3️⃣ Isi Report

Report berisi:

- ✅ **Test Results** (Pass/Fail)
- 📸 **Embedded Screenshots** (langsung di HTML, tidak perlu file terpisah)
- ⏱️ **Execution Time**
- 📈 **Charts & Statistics**
- 🔗 **Inline Assets** (bisa dikirim via email/PDF)

---

## ⚙️ Konfigurasi

### 📝 `cypress.config.js`

File konfigurasi utama Cypress:

| Konfigurasi | Nilai | Keterangan |
|-------------|-------|------------|
| `video` | `false` | Video recording DIMATIKAN |
| `screenshotOnRunFailure` | `true` | Screenshot otomatis saat test fail |
| `reporter` | `cypress-mochawesome-reporter` | HTML reporter dengan embedded screenshots |
| `embeddedScreenshots` | `true` | Screenshot embedded di HTML |
| `inlineAssets` | `true` | Assets inline (single file HTML) |

### 🐳 `docker-compose.yml`

| Environment Variable | Default | Keterangan |
|---------------------|---------|------------|
| `BASE_URL` | `https://www.google.com` | Target URL untuk testing |
| `SPEC_PATTERN` | `cypress/e2e/**/*.cy.js` | Pattern test files yang dijalankan |
| `CYPRESS_video` | `false` | Disable video recording |

### 📦 `package.json`

Dependencies yang digunakan:

- `cypress` - Core testing framework
- `cypress-mochawesome-reporter` - HTML reporting
- `cypress-audit` - Lighthouse integration
- `lighthouse` - Performance auditing
- `mochawesome` - Base reporter
- `mochawesome-merge` - Merge multiple reports
- `mochawesome-report-generator` - HTML generator

---

## 🧪 Penjelasan Test Modules

### 🟢 Functional Test (`ui_test.cy.js`)

**Tujuan**: Validasi UI dan interaksi user

**Test Cases**:
- Buka Google homepage
- Ketik keyword di search box
- Submit dan validasi hasil search
- Validasi elemen penting (logo, button)
- Screenshot setiap step

**Command Custom**:
```javascript
cy.takeNamedScreenshot('screenshot-name');
```

---

### 🟡 Performance Test (`perf_test.cy.js`)

**Tujuan**: Mengukur performance website

**Test Cases**:

1. **TTFB Check** (Time To First Byte)
   - Target: < 500ms
   - Mengukur response time server

2. **Lighthouse Audit**
   - Minimum score: 80
   - Metrics:
     - Performance
     - Accessibility
     - Best Practices
     - SEO

3. **Page Load Metrics**
   - Page load time
   - DOM ready time
   - DNS lookup time

**Command Custom**:
```javascript
cy.checkTTFB(url, maxTTFB);
cy.lighthouse(thresholds);
```

---

### 🔴 Security Test (`sec_test.cy.js`)

**Tujuan**: Validasi aspek keamanan website

**Test Cases**:

1. **Security Headers Check**
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security
   - Content-Security-Policy

2. **HTTPS Validation**
   - Memastikan protokol HTTPS digunakan

3. **XSS Input Validation**
   - Test dengan berbagai XSS payloads:
     ```javascript
     <script>alert("XSS")</script>
     <img src=x onerror=alert("XSS")>
     javascript:alert("XSS")
     ```
   - Memastikan input di-sanitize dengan benar

4. **Cookie Security**
   - Validate Secure flag
   - Validate HttpOnly flag
   - Validate SameSite attribute

**Command Custom**:
```javascript
cy.checkSecurityHeaders(url);
```

---

## 🎓 Tips & Best Practices

### 💡 Development Tips

1. **Edit Test Lokal**  
   File test di folder `cypress/` bisa diedit langsung. Docker mount sebagai volume, jadi perubahan langsung terdeteksi.

2. **Debug Mode**  
   Untuk melihat browser (non-headless), jalankan tanpa Docker:
   ```bash
   npm install
   npm run cy:open
   ```

3. **Quick Test Single File**  
   ```bash
   SPEC_PATTERN=cypress/e2e/functional/ui_test.cy.js docker-compose up
   ```

### 📌 Production Checklist

- [ ] Update `BASE_URL` ke target aplikasi
- [ ] Sesuaikan threshold Lighthouse sesuai kebutuhan
- [ ] Tambahkan test cases sesuai business logic
- [ ] Setup CI/CD integration (Jenkins, GitLab CI, GitHub Actions)
- [ ] Configure email notification untuk report

---

## 📞 Troubleshooting

### ❗ Error: "Cannot find module cypress"

**Solusi**: Hapus `node_modules` folder dan restart Docker:
```bash
rm -rf node_modules
docker-compose up --build
```

### ❗ Error: "Lighthouse failed"

**Solusi**: Lighthouse butuh resource cukup. Tambah memory limit di `docker-compose.yml`:
```yaml
deploy:
  resources:
    limits:
      memory: 6G
```

### ❗ Screenshot tidak muncul di report

**Solusi**: Pastikan konfigurasi di `cypress.config.js`:
```javascript
reporterOptions: {
  embeddedScreenshots: true,
  inlineAssets: true
}
```

---

## 📄 License

MIT License - Feel free to use and modify

---

## 👨‍💻 Author

**Senior QA DevOps Engineer**

---

<div align="center">

**🎉 Happy Testing! 🎉**

*Built with ❤️ using Cypress + Docker*

</div>
