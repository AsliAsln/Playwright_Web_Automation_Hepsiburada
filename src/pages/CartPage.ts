import { Page, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyCartPageLoaded(): Promise<void> {
        await expect(this.page.getByRole('heading', { name: 'Sepetim' })).toBeVisible({ timeout: 15000 });
    }

    async verifyProductInCart(expectedName: string): Promise<void> {
        const cartItem = this.page.locator('li[class*="basket_items_"]').first();
        const cartProductName = cartItem.locator('[class*="product_name_2Klj3"]').first();
        const actualName = await cartProductName.textContent();

        expect(actualName).not.toBeNull();
        expect(expectedName?.trim().toLowerCase()).toContain(actualName!.trim().toLowerCase().substring(0, 20));
    }
}