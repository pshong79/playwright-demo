import { expect, Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly addToCartButtonSauceLabsBoltTShirt: Locator;
  readonly removeButtonSauceLabsBoltTShirt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtonSauceLabsBoltTShirt = page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt');
    this.removeButtonSauceLabsBoltTShirt = page.getByTestId('remove-sauce-labs-bolt-t-shirt');
  }

  async addSauceLabsBoltTShirtToCart(): Promise<void> {
    await this.addToCartButtonSauceLabsBoltTShirt.click();
  }

  async assertRemoveButtonSauceLabsBoltTShirtIsVisible(): Promise<void> {
    await expect(this.removeButtonSauceLabsBoltTShirt).toBeVisible();
  }
}