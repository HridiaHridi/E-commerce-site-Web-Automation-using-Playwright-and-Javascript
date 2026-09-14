import BasePage from "./basePage.js";
export class Checkout extends BasePage {
  constructor(page){
    super(page);
  this.firstNameInput = this.page.locator('[data-test="firstName"]');
  this.lastNameInput = this.page.locator('[data-test="lastName"]');
  this.postalCodeInput = this.page.locator('[data-test="postalCode"]');
  this.continueButton = this.page.locator('[data-test="continue"]');
  this.cancelButton = this.page.locator('[data-test="cancel"]');
  this.checkoutErrorMessage = this.page.locator('[data-test="error"]');
  this.totalPrice = this.page.locator('[data-test="total-label"]')
  this.finishButton =this.page.locator('[data-test="finish"]');
  this.successOrderMessage = this.page.locator('[data-test="complete-header"]');
}

 async enterFirstName(firstName){
    await this.firstNameInput.fill(firstName);
 }

 async enterLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }
 async enterPostalCode(postalCode) {
        await this.postalCodeInput.fill(postalCode);
    } 
 async clickContinue() {
        await this.continueButton.click();
    } 

 async clickCancel() {
        await this.cancelButton.click();
    }
  getCheckoutErrorMessage() {
    return this.checkoutErrorMessage;
}
getProductName(productName){
    return this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: productName });
    }
    getTotalPrice() {
        return this.totalPrice;
    }
 async clickFinish(){
    await this.finishButton.click();
 }
 getSuccessOrderMsg(){
    return this.successOrderMessage;
 }  
}





 