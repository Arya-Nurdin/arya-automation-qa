// pages/CartPage.js

class CartPage {
  constructor(page) {
    this.page           = page;
    this.cartItems      = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueButton = page.locator('#continue-shopping');
  }

  async getCartItems() {
    const count = await this.cartItems.count();
    const items = [];
    for (let i = 0; i < count; i++) {
      const item = this.cartItems.nth(i);
      items.push({
        name:     await item.locator('.inventory_item_name').innerText(),
        price:    await item.locator('.inventory_item_price').innerText(),
        quantity: await item.locator('.cart_quantity').innerText(),
      });
    }
    return items;
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async removeItem(productName) {
    const count = await this.cartItems.count();
    for (let i = 0; i < count; i++) {
      const item = this.cartItems.nth(i);
      const name = await item.locator('.inventory_item_name').innerText();
      if (name.trim() === productName) {
        await item.locator('button').click();
        return;
      }
    }
    throw new Error(`Item tidak ditemukan di cart: ${productName}`);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = CartPage;
