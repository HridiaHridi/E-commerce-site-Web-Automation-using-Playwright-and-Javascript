
export default class BasePage {

    /**
     * @param {import('@playwright/test').Page} page //jsdoc declaration
     */
    
    constructor(page) {
        this.page = page;
        this.openHamburgerMenu = this.page.getByRole('button', { name: 'Open Menu' })
        this.resetAppState= this.page.locator('[data-test="reset-sidebar-link"]')
        this.closeMenu = this.page.getByRole('button', { name: 'Close Menu' })
        
    }

    locateButton(buttonName) {
        return this.page.getByRole("button", { name: buttonName });
    }

    async clickButton(buttonName) {
        await this.locateButton(buttonName).click();
    }

    async OpenHamburgerMenuClick(){
       await this.openHamburgerMenu.click();
    }

    async resetAppStateClick() {
    await this.resetAppState.click();
  }
  
    async CloseMenuButtonClick() {
    await this.closeMenu.click();
  }

    };

