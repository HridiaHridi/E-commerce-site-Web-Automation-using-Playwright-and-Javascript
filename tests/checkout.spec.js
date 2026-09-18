import { test, expect } from "@playwright/test";
import { ProfileLogin } from "../pageObjects/profilelogin.js";
import { Inventory } from "../pageObjects/inventory.js";
import { Cart } from "../pageObjects/cart.js";
import { Checkout } from "../pageObjects/checkout.js";

test.describe("SauceDemo Checkout Test", () => {

    let profilelogin;
    let inventory;
    let cart;
    let checkout;

    test.beforeEach(async ({ page }) => {

        profilelogin = new ProfileLogin(page);
        inventory = new Inventory(page);
        cart = new Cart(page);
        checkout = new Checkout(page);

        await profilelogin.open();
        await profilelogin.login("standard_user", "secret_sauce");

        // Add 3 products
        await inventory.addProductToCart("Sauce Labs Fleece Jacket");
        await inventory.addProductToCart("Sauce Labs Bolt T-Shirt");
        await inventory.addProductToCart("Sauce Labs Onesie");

        await inventory.openCart();      // open cart
        await cart.clickCheckout();      // click checkout

        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
    });

    test("Verify required field validation", async () => {

        await checkout.clickContinue();

        await expect(checkout.getCheckoutErrorMessage())
            .toHaveText("Error: First Name is required");
    });

    test("Verify product names and total price on Checkout Overview", async ({ page }) => {

        await checkout.fillCustomerInfo("Test", "User", "12345");
        await checkout.clickContinue();

        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");

        await expect(checkout.getProductName("Sauce Labs Fleece Jacket")).toBeVisible();
        await expect(checkout.getProductName("Sauce Labs Bolt T-Shirt")).toBeVisible();
        await expect(checkout.getProductName("Sauce Labs Onesie")).toBeVisible();

        await expect(checkout.getTotalPrice()).toHaveText("Total: $79.89");
    });

    test("Finish purchase and verify successful order message", async ({ page }) => {

        await checkout.fillCustomerInfo("Test", "User", "12345");
        await checkout.clickContinue();
        await checkout.clickFinish();

        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");

        await expect(checkout.getSuccessOrderMsg()).toHaveText("Thank you for your order!");
    });
});
