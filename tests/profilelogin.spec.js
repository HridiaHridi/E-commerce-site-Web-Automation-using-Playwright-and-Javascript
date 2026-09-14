import { test, expect } from "@playwright/test";
//import { Utilities } from "../pageObjects/Utils";
import { ProfileLogin } from "../pageObjects/profilelogin";
import { faker } from '@faker-js/faker';

// if we use faker
const user= faker.internet.email();;

//if we use random generate email function
// const utilities = new Utilities();
// let user="";

test.describe.serial("SauceDemo Site Auitomation Test",()=>{
     let profilelogin;

    test.beforeEach(async ({ page }) => {
        profilelogin = new ProfileLogin(page);
        await page.goto("https://www.saucedemo.com/");
    });


test.skip("Login with valid Credentials",async({page})=>{


await profilelogin.UsernameInput("standard_user");
await profilelogin.PasswordInput("secret_sauce");
//await profilelogin.UsernameInput(user);
await profilelogin.loginButtonClick();

//user =utilities.randomEmail();

//await page.waitForTimeout(3000);//eta use korbo na

//dynamic vabhe use korer jnno
await page.waitForLoadState("networkidle");

await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test.skip("Login with invalid credentials", async({page})=>{

await profilelogin.UsernameInput("Tester");
await profilelogin.PasswordInput("Test123");
await profilelogin.loginButtonClick();
await expect(profilelogin.getLoginErrorMessage()).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test.skip("Login with Valid Username And Empty Password",async()=>{

   await profilelogin.UsernameInput("locked_out_user");
   await profilelogin.PasswordInput("");
   await profilelogin.loginButtonClick();
   await expect(profilelogin.passwordRequiredMessage).toBeVisible();
});

test("Login with locked_out_user and verify the error message",async()=>{

   await profilelogin.UsernameInput("locked_out_user");
   await profilelogin.PasswordInput("secret_sauce");
   await profilelogin.loginButtonClick();
   await expect(profilelogin.lockedOutErrorMessage).toBeVisible();
});


test("Complete Purchase Journey",async({page})=>{

   test.step("Login with valid credentials", async () => {

await profilelogin.UsernameInput("standard_user");
await profilelogin.PasswordInput("secret_sauce");
await profilelogin.loginButtonClick();
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test.step("Reset App State", async () => {

    await profilelogin.OpenHamburgerMenuClick(); // open hamburger menu
        // reset app state
    });

});

});

