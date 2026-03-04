import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private get productCards(): Locator {
        return this.page.locator('ul[class*="productListContent"] > li[type="cozy"]');    
    }

    private get firstProductTitle(): Locator {
        return this.page.locator('[data-test-id^="title-"]').first();
    }

private async waitForFilterUpdate(): Promise<void> {
        await this.firstProductTitle.waitFor({ state: 'visible', timeout: 15000 });
    }

    async verifySearchResultsLoaded(): Promise<void> {
        await expect(this.firstProductTitle).toBeVisible({ timeout: 15000 });
    }

    async applyFilterGender(gender: string): Promise<void> 
    {
        const genderLabel = this.page.locator(`input[name="cinsiyet"][value="${gender}"]`).locator('..');
        await genderLabel.waitFor({ state: 'visible', timeout: 5000 });
        await genderLabel.click();        
        await this.waitForFilterUpdate();
    }
    async applyFilterColor(color: string): Promise<void> {
        const colorLabel = this.page.locator(`input[name="renk"][value="${color}"]`).locator('..');
        await colorLabel.waitFor({ state: 'visible', timeout: 5000 });
        await colorLabel.click();
        await this.waitForFilterUpdate();
    }
    async applyFilterSize(size: string): Promise<void> {
        const bedenlerPanel = this.page.locator('#bedenler');
        const sizeSearchInput = bedenlerPanel.getByPlaceholder('Filtrele');
       
        if (await sizeSearchInput.isVisible({ timeout: 5000 })) {
            await sizeSearchInput.scrollIntoViewIfNeeded();
            await sizeSearchInput.fill(size); 
            
            const sizeInput = bedenlerPanel.locator(`input[name="bedenler"][value="${size}"]`);
            
            const sizeLabel = sizeInput.locator('..');
            await sizeLabel.click();      
        } else {
            const sizeInput = bedenlerPanel.locator(`input[name="bedenler"][value="${size}"]`);
            await expect(sizeInput).toBeEnabled({ timeout: 15000 });
            await sizeInput.locator('..').click();
        }
        await this.waitForFilterUpdate();
    }
    async applyFilterPrice(minPrice: number, maxPrice: number): Promise<void> {
        const minPriceInput = this.page.getByPlaceholder('En az');
        const maxPriceInput = this.page.getByPlaceholder('En çok');

        await minPriceInput.waitFor({ state: 'visible', timeout: 10000 });
        await minPriceInput.fill(minPrice.toString());

        await maxPriceInput.waitFor({ state: 'visible', timeout: 10000 });
        await maxPriceInput.fill(maxPrice.toString());

        const priceSubmitButton = this.page.locator('#fiyat button[aria-label="Filtrele"]');
        if (await priceSubmitButton.isVisible()) {
            await priceSubmitButton.click();
        } else {
            await maxPriceInput.press('Enter');
        }

        await this.waitForFilterUpdate();
    }

async applyFilters(gender: string, color: string, size: string, minPrice: number, maxPrice: number): Promise<void> {
        
        await this.applyFilterGender(gender);
        await this.applyFilterColor(color);
        await this.applyFilterSize(size);
        await this.applyFilterPrice(minPrice, maxPrice);
    }

    async verifyFiltersApplied(gender: string, color: string, size: string): Promise<void> {
        await expect(this.firstProductTitle).toBeVisible({ timeout: 10000 });
        await this.productCards.first().waitFor({ state: 'attached', timeout: 10000 });        
        
        const count = await this.productCards.count();        
        expect(count).toBeGreaterThan(0);
    }

    async selectFirstProduct(): Promise<string> {
        const firstCard = this.productCards.first();
        await firstCard.waitFor({ state: 'visible', timeout: 10000 });

        const titleElement = firstCard.locator('[data-test-id^="title-"] a').first();
        await titleElement.waitFor({ state: 'visible', timeout: 10000 });

        const productName = await titleElement.getAttribute('title') ?? await titleElement.textContent();

        const productLink = firstCard.locator('article a').first();
        await productLink.click();

        return productName?.trim() ?? '';
    }
}