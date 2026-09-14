import BasePage from './basePage'

export class Cart extends BasePage{
 constructor(page){
    super(page);
   //product
    this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]')  
    this.shoppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]')
   
    this.checkoutButton = this.page.locator('[data-test="checkout"]')
    this.continueShoppingButton = this.page.locator('[data-test="continue-shopping"]')
 }

//Dynamic Locator according to product name 
getProduct(productName){
 return this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName })
}


//Add to Cart Button for Specific product(Action Method)
async addProductToCart(productName) {
 await this.getProduct(productName).getByRole('button', { name: 'Add to cart' }).click();
}

async OpenCart(){
 await this.shoppingCartLink.click();//cart open
}

getCartBadge(){
    return this.shoppingCartBadge;//Count Return for Assertion
}
 async CheckOutButton(){
    await this.checkoutButton.click();
 }

async ContinueShoppingtButton(){
    await this.continueShoppingButton.click();
 }


}