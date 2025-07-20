import { expect, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // async login(username: string, password: string): Promise<void> {
  // }

}