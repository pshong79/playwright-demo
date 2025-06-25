import { expect, Locator, type Page } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.getByTestId('shopping-cart-link');
  }

  async clickCartButton(): Promise<void> {
    await this.cartButton.click();
  }

  async assertCartItemCountIsNotVisible(): Promise<void> {
    await expect(this.page.getByTestId('shopping-cart-badge')).not.toBeVisible();
  }
  
  async assertCartItemCount(expectedCount: string): Promise<void> {
    await expect(this.page.getByTestId('shopping-cart-badge')).toHaveText(expectedCount);
  }

}