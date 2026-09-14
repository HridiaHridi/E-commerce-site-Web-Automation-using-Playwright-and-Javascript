import {test,expect} from "@playwright/test";
import {ProfileLogin} from "../pageObjects/profilelogin.js";
import { Cart } from "../pageObjects/cart.js";
import { Checkout } from "../pageObjects/checkout.js";

test.describe("SauceDemo Checkout Test", () => {

    let profilelogin;
    let cart;
    let checkout;

    test.beforeEach(async ({ page }) => {

        profilelogin = new ProfileLogin(page);
        cart = new Cart(page);
        checkout = new Checkout(page);

        await page.goto("https://www.saucedemo.com/");

        await profilelogin.UsernameInput("standard_user");
        await profilelogin.PasswordInput("secret_sauce");
        await profilelogin.loginButtonClick();

        // Add 3 products
        await cart.addProductToCart("Sauce Labs Fleece Jacket");
        await cart.addProductToCart("Sauce Labs Bolt T-Shirt");
        await cart.addProductToCart("Sauce Labs Onesie");

        await cart.OpenCart();//open cart
        await cart.CheckOutButton();//click checkout
        await expect(page).toHaveURL( "https://www.saucedemo.com/checkout-step-one.html")
    }
    )


test("Verify required field validation", async () => {

        await checkout.clickContinue();

        await expect(checkout.getCheckoutErrorMessage()
        ).toHaveText("Error: First Name is required");
    });
test("Verify product names and total price on Checkout Overview", async ({ page }) => {

        await checkout.enterFirstName("Test");
        await checkout.enterLastName("User");
        await checkout.enterPostalCode("12345");

        await checkout.clickContinue();

        await expect(page).toHaveURL(
            "https://www.saucedemo.com/checkout-step-two.html"
        );

        await expect(checkout.getProductName("Sauce Labs Fleece Jacket")
        ).toBeVisible();

        await expect(checkout.getProductName("Sauce Labs Bolt T-Shirt")
        ).toBeVisible();

        await expect(checkout.getProductName("Sauce Labs Onesie")
        ).toBeVisible();

        await expect(checkout.getTotalPrice()
        ).toHaveText("Total: $79.89");
    });


    test("Finish purchase and verify successful order message", async ({ page }) => {

        await checkout.enterFirstName("Test");
        await checkout.enterLastName("User");
        await checkout.enterPostalCode("12345");

        await checkout.clickContinue();

        await checkout.clickFinish();

        await expect(page).toHaveURL(
            "https://www.saucedemo.com/checkout-complete.html"
        );

        await expect(checkout.getSuccessOrderMsg()).toHaveText("Thank you for your order!");
    });


});