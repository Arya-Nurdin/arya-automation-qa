// tests/cart.test.js
const { test, expect } = require('@playwright/test');
const InventoryPage = require('../pages/InventoryPage');
const CartPage      = require('../pages/CartPage');
const CONFIG        = require('../config/config');
const { loginAs }   = require('../utils/helpers');

test.describe('Cart', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard');
  });

  test('menampilkan semua produk di halaman inventory', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const products = await inventoryPage.getAllProducts();
    expect(products.length).toBeGreaterThan(0);
    console.log('Produk tersedia:', products.map(p => `${p.name} (${p.price})`));
  });

  test('tambah produk ke cart dan verifikasi badge', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductByName(CONFIG.products[0]);
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(1);
  });

  test('tambah beberapa produk sekaligus', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addMultipleProducts(CONFIG.products);
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(CONFIG.products.length);
  });

  test('hapus produk dari cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductByName(CONFIG.products[0]);
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.removeItem(CONFIG.products[0]);
    const remaining = await cartPage.getItemCount();
    expect(remaining).toBe(0);
  });

  test('isi cart tampil benar di halaman cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addMultipleProducts(CONFIG.products);
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    const items = await cartPage.getCartItems();
    expect(items.length).toBe(CONFIG.products.length);
    expect(items.map(i => i.name)).toEqual(expect.arrayContaining(CONFIG.products));
  });

});
