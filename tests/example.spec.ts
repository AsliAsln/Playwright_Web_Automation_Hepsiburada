import { test, expect, Page } from '@playwright/test';
import { HomePage} from '../src/pages/HomePage';
import { SearchResultsPage} from '../src/pages/SearchResultsPage';
import { ProductDetailPage} from '../src/pages/ProductDetailPage';
import { CartPage} from '../src/pages/CartPage';

test('Hepsiburada E2E Adidas', async ({ page, context }) => {
    const homePage = new HomePage(page);

    //Ana sayfa açılır
    await homePage.navigate();
    await acceptCookies(page);
    await homePage.verifyHomePageLoaded();
    await homePage.searchForProduct('Adidas ayakkabı');

    //Ürün listeleme ve Filtreler
    const searchResultsPage = new SearchResultsPage(page);
    await searchResultsPage.applyFilters('Erkek', 'Beyaz', '42', 3000, 5000);

    
    const pagePromise = context.waitForEvent('page');
    const productName = await searchResultsPage.selectFirstProduct();
    const newPage = await pagePromise;

    await acceptCookies(newPage);

    // Yeni sekme üzerinden devam ediyoruz
    const productDetailPage = new ProductDetailPage(newPage);
    const cartPage = new CartPage(newPage);
 
    //Sepete Ekle
    await productDetailPage.addToCartProduct();

    //Sepet Doğrulamaları
    await cartPage.verifyProductInCart(productName);
});

async function acceptCookies(page: Page) {
    const acceptCookiesButton = page.locator('#onetrust-accept-btn-handler');
    try {
        await acceptCookiesButton.click({ timeout: 5000 });
        await page.waitForTimeout(2000);
    } catch (error) {
        // no banner, continue
    }
}