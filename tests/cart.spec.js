import { test, expect } from "@playwright/test";
import { ProfileLogin } from "../pageObjects/profilelogin.js";
import { Inventory } from "../pageObjects/inventory.js";
import { Cart } from "../pageObjects/cart.js";

test.describe("SauceDemo Product Test", () => {

    let profilelogin;
    let inventory;
    let cart;

    test.beforeEach(async ({ page }) => {

        profilelogin = new ProfileLogin(page);
        inventory = new Inventory(page);
        cart = new Cart(page);

        await profilelogin.open();
        await profilelogin.login("standard_user", "secret_sauce");

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    test("Add 3 products to Cart and Verify the Cart Count", async () => {

        await inventory.addProductToCart("Sauce Labs Fleece Jacket");
        await inventory.addProductToCart("Sauce Labs Bolt T-Shirt");
        await inventory.addProductToCart("Sauce Labs Onesie");

        await expect(inventory.getCartBadge()).toHaveText("3");
    });

    test("Open Cart After Adding products", async ({ page }) => {

        await inventory.openCart();

        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    });

    test("Verify Navigate to Checkout Page", async ({ page }) => {

        await inventory.openCart();
        await cart.clickCheckout();

        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
    });
});
