import BasePage from './basePage.js';

/**
 * Checkout pages -> checkout-step-one / step-two / complete
 */
export class Checkout extends BasePage {
  constructor(page) {
    super(page);

    // Step one - customer information form
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.checkoutErrorMessage = page.locator('[data-test="error"]');

    // Step two - overview
    this.totalPrice = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');

    // Complete
    this.successOrderMessage = page.locator('[data-test="complete-header"]');
  }

  async enterFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async enterPostalCode(postalCode) {
    await this.postalCodeInput.fill(postalCode);
  }

  // The 3 fields above in one method
  async fillCustomerInfo(firstName, lastName, postalCode) {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterPostalCode(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  getCheckoutErrorMessage() {
    return this.checkoutErrorMessage;
  }

  // Dynamic Locator - product name shown on the overview page
  getProductName(productName) {
    return this.page
      .locator('[data-test="inventory-item-name"]')
      .filter({ hasText: productName });
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  getSuccessOrderMsg() {
    return this.successOrderMessage;
  }
}
