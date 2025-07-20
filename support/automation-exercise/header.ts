import { expect, Locator, type Page } from '@playwright/test';

export class Header {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickHeaderMenu(menuText: string): Promise<void> {
    const link = this.page.getByRole('link', { name: menuText });
    await link.click();
  }

}