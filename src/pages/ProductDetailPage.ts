import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {
    readonly page: Page;
    constructor(page: Page) { this.page = page; }

    async addToCartProduct() {
        
        const addToCartButton = this.page.locator('[data-test-id="addToCart"]');
        await addToCartButton.click();
        await expect(this.page.locator('.checkoutui-Modal-IAYMPfHUm0giU1ze9D0C')).toBeVisible();
        await this.page.getByRole('button', { name: 'Sepete git' }).click();
    }
}
