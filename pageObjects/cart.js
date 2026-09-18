import BasePage from './basePage.js';

/**
 * Cart page -> https://www.saucedemo.com/cart.html
 * (Opening the cart itself lives in BasePage, because the cart icon
 *  is in the header of every page.)
 */
export class Cart extends BasePage {
  constructor(page) {
    super(page);

    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  // Dynamic Locator for a product row inside the cart
  getCartItem(productName) {
    return this.cartItems.filter({ hasText: productName });
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }
}
