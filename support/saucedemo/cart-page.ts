import { expect, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertCartItem(productName: string): Promise<void> {
    const cartItem = this.page.getByTestId('inventory-item-name').filter({ hasText: productName });
    await expect(cartItem).toBeVisible();
  }
}