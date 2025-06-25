import { expect, type Page } from '@playwright/test';

export class SharedObjects {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToPage(pageUrl: string): Promise<void> {
    await this.page.goto(pageUrl);
  }

  async fillInputField(fieldName: string, value: string): Promise<void> {
    const inputField = this.page.getByRole('textbox', { name: fieldName });
    await inputField.fill(value);
  }

  async clickButton(buttonText: string): Promise<void> {
    const button = this.page.getByRole('button', { name: buttonText });
    await button.click();
  }

  async assertCartItem(productName: string): Promise<void> {
    const cartItem = this.page.getByTestId('inventory-item-name').filter({ hasText: productName });
    await expect(cartItem).toBeVisible();
  }

  async assertHeadingIsVisible(headerText: string): Promise<void> {
    const header = this.page.getByRole('heading', { name: headerText });
    await expect(header).toBeVisible();
  }

  async takeFullPageScreenshot(screenshotName: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${screenshotName}.png`, fullPage: true });
  }
}