import { test, expect } from "@playwright/test";
import { ProfileLogin } from "../pageObjects/profilelogin.js";
import {Cart} from "../pageObjects/cart.js";

test.describe("SauceDemo Product Test", () => {

    let cart;
    let profilelogin;

    test.beforeEach(async ({ page }) => {

        profilelogin = new ProfileLogin(page);
        cart = new Cart(page);

        await page.goto("https://www.saucedemo.com/");

        await profilelogin.UsernameInput("standard_user");
        await profilelogin.PasswordInput("secret_sauce");
        await profilelogin.loginButtonClick();

        await expect(page).toHaveURL(
            "https://www.saucedemo.com/inventory.html"
        );
    }); 

test("Add 3 products to Cart and Verify the Cart Count",async()=>{  
 
    await cart.addProductToCart("Sauce Labs Fleece Jacket");   
    await cart.addProductToCart("Sauce Labs Bolt T-Shirt");
    await cart.addProductToCart("Sauce Labs Onesie");

     await expect(cart.getCartBadge()).toHaveText("3");
}); 

 test("Open Cart After Adding products",async({page})=>{
    await cart.OpenCart();
    await expect(page).toHaveURL(
        "https://www.saucedemo.com/cart.html");
 });

  test("Verify Navigate to Checkout Page 1",async({page})=>{
    await cart.OpenCart();
    await cart.CheckOutButton();

    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
  });
});