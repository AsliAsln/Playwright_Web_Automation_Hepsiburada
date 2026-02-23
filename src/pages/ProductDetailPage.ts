import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyProductDetailLoaded(): Promise<void> {
        const priceText = this.page.locator('[data-test-id="checkout-price"]').or(this.page.locator('[data-test-id="default-price"]'));
        await expect(priceText).toBeVisible({ timeout: 15000 });
    }

    async addToCartProduct(): Promise<void> {
        const addToCartButton = this.page.locator('[data-test-id="addToCart"]');
        await addToCartButton.click();

        const successMessage = this.page.getByText('Ürün sepetinizde', { exact: false });       
        await successMessage.waitFor({ state: 'visible', timeout: 10000 });

        const goToCartButton = this.page.getByRole('button', { name: 'Sepete git' });
        await goToCartButton.waitFor({ state: 'visible', timeout: 5000 });
        await goToCartButton.click();

        await this.handleLoginPrompt();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async handleLoginPrompt(): Promise<void> {
        try {
            const continueWithoutLogin = this.page.getByRole('button', { name: /giriş yapmadan devam et/i });
            await continueWithoutLogin.waitFor({ state: 'visible', timeout: 5000 });
            await continueWithoutLogin.click();
        } catch {
            // No login prompt appeared
        }
    }
}