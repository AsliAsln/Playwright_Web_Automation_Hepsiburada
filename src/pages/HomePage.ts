import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private get searchInput(): Locator {
        return this.page.locator('input[data-test-id="search-bar-input"]').first();
    }

    private get initialSearchWrapper(): Locator {
        return this.page.locator('div[class*="initialComponent"][class*="hk7c"]');
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://www.hepsiburada.com', { waitUntil: 'domcontentloaded' });
        await this.searchInput.waitFor({ state: 'visible', timeout: 20000 });
        await this.dismissOverlays();
    }

    async searchForProduct(searchTerm: string): Promise<void> {
        try {
            const wrapper = this.initialSearchWrapper;
            if (await wrapper.isVisible({ timeout: 2000 })) {
                await wrapper.click({ timeout: 3000 });
                await this.page.waitForTimeout(1500);
            }
        } catch {
            // No wrapper div found, proceed
        }

        await this.searchInput.click({ force: true });
        await this.page.waitForTimeout(300);
        await this.page.keyboard.press('Escape'); 
        await this.page.waitForTimeout(200);

        await this.searchInput.clear();
        await this.page.keyboard.type(searchTerm, { delay: 30 });
        await this.page.keyboard.press('Enter');

        await this.page.locator('[data-test-id^="title-"]').first().waitFor({ state: 'visible', timeout: 15000 });
    }

    async dismissOverlays(): Promise<void> {
        try {
            const clicked = await this.page.evaluate(() => {
                const buttons = document.querySelectorAll('button');
                for (const btn of buttons) {
                    if (btn.textContent?.includes('Kabul') && btn.offsetParent !== null) {
                        btn.click();
                        return true;
                    }
                }
                const otBtn = document.getElementById('onetrust-accept-btn-handler');
                if (otBtn) { otBtn.click(); return true; }
                return false;
            });
            if (clicked) {
                await this.page.waitForTimeout(1000);
            }
        } catch {
            // Ignore
        }

        const overlaySelectors = [
            '[data-test-id="overlay-close"]',
            'button[aria-label="Kapat"]',
            '[data-test-id="notification-permission-close"]',
        ];

        for (const selector of overlaySelectors) {
            try {
                const closeBtn = this.page.locator(selector).first();
                if (await closeBtn.isVisible({ timeout: 1000 })) {
                    await closeBtn.click({ force: true });
                }
            } catch {
                // Continue
            }
        }

        await this.page.keyboard.press('Escape').catch(() => {});
    }

    async verifyHomePageLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/hepsiburada\.com/);
        await expect(this.page.locator('input[data-test-id="search-bar-input"]').first()).toBeVisible();
    }
}