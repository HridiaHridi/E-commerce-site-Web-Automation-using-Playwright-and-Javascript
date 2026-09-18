import BasePage from './basePage.js';

/**
 * Login page -> https://www.saucedemo.com/
 */
export class ProfileLogin extends BasePage {
  constructor(page) {
    super(page);

    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.loginErrorMessage = page.locator('[data-test="error"]');
  }

  // Open the login page ("/" uses the baseURL from playwright.config.js)
  async open() {
    await this.page.goto('/');
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  // The 3 steps above in one method, so tests can just say:
  // await profilelogin.login("standard_user", "secret_sauce");
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  // Error message shown for invalid / empty / locked out users
  getLoginErrorMessage() {
    return this.loginErrorMessage;
  }
}
