import { test, expect } from "@playwright/test";
import { ProfileLogin } from "../pageObjects/profilelogin.js";
import { Inventory } from "../pageObjects/inventory.js";
import { Cart } from "../pageObjects/cart.js";
import { Checkout } from "../pageObjects/checkout.js";

test.describe.serial("SauceDemo Site Auitomation Test", () => {

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
    });

    test.skip("Login with valid Credentials", async ({ page }) => {

        await profilelogin.login("standard_user", "secret_sauce");

        // dynamic wait (instead of waitForTimeout)
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    test.skip("Login with invalid credentials", async () => {

        await profilelogin.login("Tester", "Test123");

        await expect(profilelogin.getLoginErrorMessage())
            .toHaveText("Epic sadface: Username and password do not match any user in this service");
    });

    test.skip("Login with Valid Username And Empty Password", async () => {

        await profilelogin.login("locked_out_user", "");

        await expect(profilelogin.getLoginErrorMessage())
            .toHaveText("Epic sadface: Password is required");
    });

    test("Login with locked_out_user and verify the error message", async () => {

        await profilelogin.login("locked_out_user", "secret_sauce");

        await expect(profilelogin.getLoginErrorMessage())
            .toHaveText("Epic sadface: Sorry, this user has been locked out.");
    });

    test("Complete Purchase Journey", async ({ page }) => {

        await test.step("Login with valid credentials", async () => {

            await profilelogin.login("standard_user", "secret_sauce");

            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        });

        await test.step("Add 3 products to the cart", async () => {

            await inventory.addProductToCart("Sauce Labs Fleece Jacket");
            await inventory.addProductToCart("Sauce Labs Bolt T-Shirt");
            await inventory.addProductToCart("Sauce Labs Onesie");

            await expect(inventory.getCartBadge()).toHaveText("3");
        });

        await test.step("Open cart and go to checkout", async () => {

            await inventory.openCart();
            await cart.clickCheckout();

            await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        });

        await test.step("Fill the form and finish the order", async () => {

            await checkout.fillCustomerInfo("Test", "User", "12345");
            await checkout.clickContinue();
            await checkout.clickFinish();

            await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
            await expect(checkout.getSuccessOrderMsg()).toHaveText("Thank you for your order!");
        });

        await test.step("Reset App State", async () => {

            await checkout.resetAppStateClick();   // open menu -> reset -> close menu

            await expect(checkout.getCartBadge()).toBeHidden();
        });
    });
});
