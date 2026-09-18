/**
 * BasePage = things that exist on EVERY page of the site
 * (the hamburger menu and the cart icon in the header).
 *
 * Every other page class extends this one, so they all get
 * these locators and methods for free.
 */
export default class BasePage {
  /**
   * @param {import('@playwright/test').Page} page //jsdoc declaration
   */
  constructor(page) {
    this.page = page;

    // Hamburger (side) menu
    this.openHamburgerMenu = page.getByRole('button', { name: 'Open Menu' });
    this.closeMenu = page.getByRole('button', { name: 'Close Menu' });
    this.resetAppState = page.locator('[data-test="reset-sidebar-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');

    // Header
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  // ---------- Dynamic locator ----------

  locateButton(buttonName) {
    return this.page.getByRole('button', { name: buttonName });
  }

  async clickButton(buttonName) {
    await this.locateButton(buttonName).click();
  }

  // ---------- Hamburger menu ----------

  async openMenu() {
    await this.openHamburgerMenu.click();
  }

  async closeMenuClick() {
    await this.closeMenu.click();
  }

  // Open the menu -> click Reset App State -> close the menu
  async resetAppStateClick() {
    await this.openMenu();
    await this.resetAppState.click();
    await this.closeMenuClick();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  // ---------- Cart icon (header) ----------

  async openCart() {
    await this.shoppingCartLink.click();
  }

  // Returns the badge so the test can assert the count
  getCartBadge() {
    return this.shoppingCartBadge;
  }
}
