import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Dinamik bekleme için yardımcı fonksiyon
    private async waitForFilterUpdate() {
        
        //await this.page.waitForTimeout(1000); 
    }

    async applyFilters(gender: string, color: string, size: string, minPrice: number, maxPrice: number) {
        
        // 1. Cinsiyet Filtresi
        const genderCheckbox = this.page.getByRole('checkbox', { name: gender, exact: true });
        //await genderCheckbox.check(); 

        this.waitForFilterUpdate();
        // 2. Renk Filtresi
        const colorCheckbox = this.page.getByRole('checkbox', { name: color, exact: true });
        //await colorCheckbox.check();

        this.waitForFilterUpdate();

        // 3. Numara (Beden) Filtresi
        const sizeCheckbox = this.page.getByRole('checkbox', { name: size, exact: true });
        //await sizeCheckbox.check();

        this.waitForFilterUpdate();

        // 4. Fiyat Aralığı
        const minPriceInput = this.page.getByPlaceholder('En az');
        const maxPriceInput = this.page.getByPlaceholder('En çok');
        
        await minPriceInput.fill(minPrice.toString());
        await maxPriceInput.fill(maxPrice.toString());
        
        // Fiyat onay butonu
        const priceSubmitButton = this.page.locator('button[class*="price-search-button"]'); 
        if (await priceSubmitButton.isVisible()) {
             await priceSubmitButton.click();
        } else {
             await maxPriceInput.press('Enter');
        }
        await this.page.waitForTimeout(2500);
    }

    async selectFirstProduct() {
        // Ürün listesinin yüklenmesi
        await this.page.locator('[id="1"]').waitFor({ state: 'visible', timeout: 10000 });
        const firstProduct = await this.page.locator('.productListContent-zAP0Y5msy8OHn5z7T_K_').first();
        const productName = firstProduct.locator('[data-test-id="title-1"]').first().textContent();
        console.log('Seçilen ürün adı:', productName);
        await firstProduct.click();
        return productName;
    }
}
