// pages/CheckoutPage.js

class CheckoutPage {
  constructor(page) {
    this.page              = page;
    this.firstNameInput    = page.locator('#first-name');
    this.lastNameInput     = page.locator('#last-name');
    this.zipCodeInput      = page.locator('#postal-code');
    this.continueButton    = page.locator('#continue');
    this.finishButton      = page.locator('#finish');
    this.confirmationHeader = page.locator('.complete-header');
    this.summaryTotal      = page.locator('.summary_total_label');
    this.summaryItems      = page.locator('.cart_item');
  }

  async fillShippingInfo({ firstName, lastName, zipCode }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
    await this.continueButton.click();
  }

  async getOrderSummary() {
    const count = await this.summaryItems.count();
    const items = [];
    for (let i = 0; i < count; i++) {
      const item = this.summaryItems.nth(i);
      items.push({
        name:  await item.locator('.inventory_item_name').innerText(),
        price: await item.locator('.inventory_item_price').innerText(),
      });
    }
    return {
      items,
      total: await this.summaryTotal.innerText(),
    };
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async getConfirmationMessage() {
    return await this.confirmationHeader.innerText();
  }
}

module.exports = CheckoutPage;
