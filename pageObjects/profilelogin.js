import BasePage from './basePage'
export class ProfileLogin extends BasePage {
    constructor(page){
    super(page);
   
    //this.page = new BasePage(page);
    this.usernameInput = this.page.locator('[data-test="username"]')
    this.passwordInput= this.page.locator('[data-test="password"]') 
    this.loginButton = this.page.locator('[data-test="login-button"]')
    this.loginErrorMessage = this.page.locator('[data-test="error"]')
    this.passwordRequiredMessage= this.page.getByText('Epic sadface: Password is required')
    this.lockedOutErrorMessage =this.page.getByText('Epic sadface: Sorry, this user has been locked out.')
    }

    //Dynamic Locator

    // locateButton(buttonName) {
    //     return this.page.getByRole("button", { name: buttonName });
    // }
    
    async UsernameInput(Username){
        await this.usernameInput.fill(Username);
    }

    async PasswordInput(password){
        await this.passwordInput.fill(password);
    }
    
    async loginButtonClick() {
        await this.locateButton("Login").click();
    }
    
    getLoginErrorMessage() {
      return this.loginErrorMessage;
    }



    // getPasswordRequiredMessage() {
    //   return this.passwordRequiredMessage;
    // }

    // async loginButtonClick(){
    //     await this.loginButton.click();
    
};