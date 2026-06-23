// tests/checkout.test.js
const { test, expect } = require('@playwright/test');
const InventoryPage  = require('../pages/InventoryPage');
const CartPage       = require('../pages/CartPage');
const CheckoutPage   = require('../pages/CheckoutPage');
const CONFIG         = require('../config/config');
const { loginAs }    = require('../utils/helpers');

test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard');
  });

  test('alur checkout lengkap dari tambah produk hingga konfirmasi', async ({ page }) => {
    // 1. Tambah produk
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addMultipleProducts(CONFIG.products);
    await inventoryPage.goToCart();

    // 2. Mulai checkout
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    await page.waitForURL('**/checkout-step-one.html');

    // 3. Isi data pengiriman
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingInfo(CONFIG.checkout);
    await page.waitForURL('**/checkout-step-two.html');

    // 4. Verifikasi ringkasan order
    const summary = await checkoutPage.getOrderSummary();
    console.log('Total:', summary.total);
    expect(summary.items.length).toBe(CONFIG.products.length);

    // 5. Selesaikan order
    await checkoutPage.finishOrder();
    await page.waitForURL('**/checkout-complete.html');

    // 6. Verifikasi konfirmasi
    const message = await checkoutPage.getConfirmationMessage();
    expect(message).toContain('Thank you');
  });

  test('checkout gagal jika form pengiriman kosong', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductByName(CONFIG.products[0]);
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();

    // Klik continue tanpa mengisi form
    await page.click('#continue');
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
  });

});
