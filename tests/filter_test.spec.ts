import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { SearchResultsPage } from '../src/pages/SearchResultsPage';
import { ProductDetailPage } from '../src/pages/ProductDetailPage';
import { CartPage } from '../src/pages/CartPage';

test.use({ actionTimeout: 15000 });
test.setTimeout(60000);

test('Hepsiburada E2E Adidas', async ({ page, context }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await acceptCookies(page);
    await homePage.verifyHomePageLoaded();

    await homePage.searchForProduct('Adidas ayakkabı');

    const searchResultsPage = new SearchResultsPage(page);
    await searchResultsPage.verifySearchResultsLoaded();
    await acceptCookies(page);
    

    await searchResultsPage.applyFilters('Erkek', 'Beyaz', '42', 3000, 5000);
    await searchResultsPage.verifyFiltersApplied('Erkek', 'Beyaz', '42');

    const pagePromise = context.waitForEvent('page');
    const productName = await searchResultsPage.selectFirstProduct();
    const newPage = await pagePromise;

    await acceptCookies(newPage);

    const productDetailPage = new ProductDetailPage(newPage);
    const cartPage = new CartPage(newPage);

    await productDetailPage.verifyProductDetailLoaded();
    await acceptCookies(newPage);

    await productDetailPage.addToCartProduct();

    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyProductInCart(productName);
});

async function acceptCookies(page: Page): Promise<void> {
    const acceptCookiesButton = page.locator('#onetrust-accept-btn-handler');
    acceptCookiesButton.click({ timeout: 5000 }).catch(() => {
        // no banner, continue
    }
    );
}
