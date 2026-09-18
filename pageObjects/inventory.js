import BasePage from './basePage.js';

/**
 * Products page -> https://www.saucedemo.com/inventory.html
 * This is where the product list and the "Add to cart" buttons live.
 */
export class Inventory extends BasePage {
  constructor(page) {
    super(page);

    this.inventoryItems = page.locator('[data-test="inventory-item"]');
  }

  // Dynamic Locator according to product name
  getProduct(productName) {
    return this.inventoryItems.filter({ hasText: productName });
  }

  // Click "Add to cart" on one product
  async addProductToCart(productName) {
    await this.getProduct(productName)
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  // Click "Remove" on one product
  async removeProductFromCart(productName) {
    await this.getProduct(productName)
      .getByRole('button', { name: 'Remove' })
      .click();
  }
}
