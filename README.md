
**Ini merupakan contoh pengujian automasi menggunakan plywright, total 10 test case yang saya buat
menggunakan website dummy https://www.saucedemo.com untuk implementasi pengujian**


# Saucedemo Automation

Proyek otomasi UI untuk [saucedemo.com](https://www.saucedemo.com) menggunakan **JavaScript + Playwright** dengan pola **Page Object Model (POM)**.

## Struktur Proyek

```
saucedemo-automation/
├── config/
│   └── config.js          # URL, kredensial, data checkout
├── pages/
│   ├── LoginPage.js        # Selector & aksi halaman login
│   ├── InventoryPage.js    # Selector & aksi halaman produk
│   ├── CartPage.js         # Selector & aksi halaman cart
│   └── CheckoutPage.js     # Selector & aksi halaman checkout
├── tests/
│   ├── login.test.js       # Test kasus login
│   ├── cart.test.js        # Test kasus cart & produk
│   └── checkout.test.js    # Test kasus alur checkout
├── utils/
│   └── helpers.js          # Fungsi reusable (loginAs, logout)
├── playwright.config.js    # Konfigurasi Playwright
└── package.json
```

## Cara Instalasi

```bash
npm install
npx playwright install chromium
```

## Cara Menjalankan

```bash
# Jalankan semua test
npm test

# Jalankan dengan tampilan browser
npm run test:headed

# Jalankan dengan UI mode (interaktif)
npm run test:ui

# Lihat laporan HTML setelah test selesai
npm run report

# Jalankan test tertentu saja
npx playwright test tests/login.test.js
```

## Akun yang Tersedia

| Username              | Keterangan                  |
|-----------------------|-----------------------------|
| `standard_user`       | Akun normal                 |
| `locked_out_user`     | Akun terkunci               |
| `problem_user`        | Akun bermasalah (bug test)  |
| `performance_glitch_user` | Akun lambat             |

Password semua akun: `secret_sauce`
