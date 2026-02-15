import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    constructor(page: Page) { this.page = page; }

    async verifyProductInCart(name: string) {
        const firstItem = this.page.locator('.basket_items_3C53o').first();
        const actualName = await firstItem.locator('.product_name_2Klj3 a').innerText();
        expect(name).toContain(actualName);
    }
}
