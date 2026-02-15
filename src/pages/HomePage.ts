import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly acceptCookiesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('input[data-test-id="search-bar-input"]');
        this.acceptCookiesButton = page.locator('#onetrust-accept-btn-handler');
    }
 
    async navigate(): Promise<void> {
        await this.page.goto('https://www.hepsiburada.com');
        await this.page.waitForLoadState('domcontentloaded');
    }

  

async searchForProduct(searchTerm: string): Promise<void> {
    await this.searchInput.waitFor({ state: 'visible' });

    await this.searchInput.focus();
    
    await this.page.waitForTimeout(500); 
    
    await this.searchInput.fill(searchTerm);

    await this.page.waitForTimeout(3000); 

    
    await this.page.keyboard.press('Enter');

}

    async verifyHomePageLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/hepsiburada\.com/);
        await expect(this.searchInput).toBeVisible();
    }
}