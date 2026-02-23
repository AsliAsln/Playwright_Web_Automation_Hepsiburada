# 🛒 Hepsiburada Web Test Automation

[![tr](https://img.shields.io/badge/lang-tr-red.svg)](README.tr.md)
[![en](https://img.shields.io/badge/lang-en-blue.svg)](README.md)

End-to-end (E2E) web test automation project for the Hepsiburada website, built with [Playwright](https://playwright.dev/) using the Page Object Model (POM) design pattern.

## 📋 Test Scenario

Tests a complete shopping flow from homepage to cart verification:

**Home Page → Product Search → Apply Filters → Product Selection → Add to Cart → Cart Verification**

| Step | Page Object | Description |
|------|-------------|-------------|
| 1 | `HomePage` | Navigate to Hepsiburada homepage |
| 2 | `SearchResultsPage` | Search for a product and verify results |
| 3 | `SearchResultsPage` | Apply gender, color, size, and price range filters |
| 4 | `ProductDetailPage` | Select the first product and add it to cart |
| 5 | `CartPage` | Verify the cart page and validate the product |

## 🎥 Test Video



## 📁 Project Structure


```
├── .github/                          # GitHub configurations
├── src/
│   └── pages/
│       ├── CartPage.ts               # Cart page actions & assertions
│       ├── HomePage.ts               # Homepage actions
│       ├── ProductDetailPage.ts      # Product detail actions
│       └── SearchResultsPage.ts      # Search & filter actions
├── tests/
│   └── filter_test.spec.ts           # Main test spec file
├── playwright-report/                # HTML test reports
├── test-results/                     # Test execution results
├── playwright.config.ts              # Playwright configuration
├── package.json                      # Dependencies & scripts
├── odev                              # Assignment notes
└── .gitignore
```

## ⚙️ Applied Filters

The test uses the following filter parameters:

| Parameter | Example Value |
|-----------|---------------|
| Product to search | `Adidas ayakkabi` |
| Gender filter | `Erkek` |
| Color filter | `Beyaz` |
| Size filter | `42` |
| Minimum price | `3000` |
| Maximum price | `5000` |

## 🚀 Setup & Run

### Requirements

- [Node.js](https://nodejs.org/) (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/USER/REPO.git
cd REPO

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running the Tests

```bash
# Run all tests
npx playwright test

# Run with UI mode
npx playwright test --ui

# Run specific test file
npx playwright test tests/filter_test.spec.ts

# Run in headed mode (visible browser)
npx playwright test --headed

# Show HTML report
npx playwright show-report
```

## 🏗️ Design Pattern

The project follows the **Page Object Model (POM)** pattern:

- Each page of the application is represented by a class under `src/pages/`
- Test logic is separated from page interactions
- Page objects encapsulate selectors and actions, making tests readable and maintainable

```
filter_test.spec.ts  →  HomePage.ts
                     →  SearchResultsPage.ts
                     →  ProductDetailPage.ts
                     →  CartPage.ts
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Playwright](https://playwright.dev/) | Browser automation & testing framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test development |
| Page Object Model | Design pattern for maintainable tests |
