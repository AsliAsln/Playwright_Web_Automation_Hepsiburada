# 🛒 Hepsiburada Web Test Otomasyonu

[![tr](https://img.shields.io/badge/lang-tr-red.svg)](README.tr.md)
[![en](https://img.shields.io/badge/lang-en-blue.svg)](README.md)

Hepsiburada web sitesi için [Playwright](https://playwright.dev/) ve Page Object Model (POM) tasarım deseni kullanılarak yazılmış uçtan uca (E2E) web test otomasyon projesidir.

## 📋 Test Senaryosu

Ana sayfadan sepet doğrulamasına kadar tam bir alışveriş akışını test eder:

**Ana Sayfa → Ürün Arama → Filtre Uygulama → Ürün Seçimi → Sepete Ekleme → Sepet Doğrulama**

| Adım | Page Object | Açıklama |
|------|-------------|----------|
| 1 | `HomePage` | Hepsiburada ana sayfasına gidilir |
| 2 | `SearchResultsPage` | Ürün aranır ve sonuçlar doğrulanır |
| 3 | `SearchResultsPage` | Cinsiyet, renk, beden ve fiyat aralığı filtreleri uygulanır |
| 4 | `ProductDetailPage` | İlk ürün seçilir ve sepete eklenir |
| 5 | `CartPage` | Sepet sayfası doğrulanır ve ürün kontrol edilir |

## 🎥 Test Videosu



## 📁 Proje Yapısı

```
├── .github/                          # GitHub yapılandırmaları
├── src/
│   └── pages/
│       ├── CartPage.ts               # Sepet sayfası işlemleri & doğrulamalar
│       ├── HomePage.ts               # Ana sayfa işlemleri
│       ├── ProductDetailPage.ts      # Ürün detay işlemleri
│       └── SearchResultsPage.ts      # Arama & filtre işlemleri
├── tests/
│   └── filter_test.spec.ts           # Ana test dosyası
├── playwright-report/                # HTML test raporları
├── test-results/                     # Test çalıştırma sonuçları
├── playwright.config.ts              # Playwright yapılandırması
├── package.json                      # Bağımlılıklar & scriptler
├── odev                              # Ödev notları
└── .gitignore
```

## Uygulanacak Filtreler

Test aşağıdaki filtre parametreleri ile çalışır:

| Parametre | Açıklama | Örnek Değer |
|-----------|----------|-------------|
| Aranacak ürün | `Adidas ayakkabi` |
| Cinsiyet filtresi | `Erkek` |
| Renk filtresi | `Beyaz` |
| Beden filtresi | `42` |
| Minimum fiyat | `3000` |
| Maksimum fiyat | `5000` |

## 🚀 Kurulum & Çalıştırma

### Gereksinimler

- [Node.js](https://nodejs.org/) (v18+)
- npm veya yarn

### Kurulum

```bash
# Repoyu klonla
git clone https://github.com/KULLANICI/REPO.git
cd REPO

# Bağımlılıkları yükle
npm install

# Playwright tarayıcılarını yükle
npx playwright install
```

### Testleri Çalıştırma

```bash
# Tüm testleri çalıştır
npx playwright test

# UI modunda çalıştır
npx playwright test --ui

# Belirli bir test dosyasını çalıştır
npx playwright test tests/filter_test.spec.ts

# Headed modda çalıştır (tarayıcı görünür)
npx playwright test --headed

# HTML raporu göster
npx playwright show-report
```

## 🏗️ Tasarım Deseni

Proje **Page Object Model (POM)** desenini takip eder:

- Uygulamanın her sayfası `src/pages/` altında bir sınıf ile temsil edilir
- Test mantığı sayfa etkileşimlerinden ayrılmıştır
- Page object'ler seçicileri ve aksiyonları kapsüller, testleri okunabilir ve sürdürülebilir kılar

```
filter_test.spec.ts  →  HomePage.ts
                     →  SearchResultsPage.ts
                     →  ProductDetailPage.ts
                     →  CartPage.ts
```

## 🛠️ Teknoloji Yığını

| Teknoloji | Kullanım Amacı |
|-----------|----------------|
| [Playwright](https://playwright.dev/) | Tarayıcı otomasyon & test framework'ü |
| [TypeScript](https://www.typescriptlang.org/) | Tip güvenli test geliştirme |
| Page Object Model | Sürdürülebilir testler için tasarım deseni |
