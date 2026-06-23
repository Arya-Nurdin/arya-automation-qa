// pages/InventoryPage.js

class InventoryPage {
  constructor(page) {
    this.page        = page;
    this.items       = page.locator('.inventory_item');
    this.cartBadge   = page.locator('.shopping_cart_badge');
    this.cartIcon    = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async getAllProducts() {
    const count = await this.items.count();
    const products = [];
    for (let i = 0; i < count; i++) {
      const item = this.items.nth(i);
      products.push({
        name:  await item.locator('.inventory_item_name').innerText(),
        price: await item.locator('.inventory_item_price').innerText(),
      });
    }
    return products;
  }

  async addProductByName(productName) {
    const count = await this.items.count();
    for (let i = 0; i < count; i++) {
      const item = this.items.nth(i);
      const name = await item.locator('.inventory_item_name').innerText();
      if (name.trim() === productName) {
        await item.locator('button').click();
        return true;
      }
    }
    throw new Error(`Produk tidak ditemukan: ${productName}`);
  }

  async addMultipleProducts(productNames) {
    for (const name of productNames) {
      await this.addProductByName(name);
    }
  }

  async getCartCount() {
    if (await this.cartBadge.isVisible()) {
      return parseInt(await this.cartBadge.innerText());
    }
    return 0;
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async sortBy(option) {
    // option: 'az' | 'za' | 'lohi' | 'hilo'
    await this.sortDropdown.selectOption(option);
  }
}

module.exports = InventoryPage;
