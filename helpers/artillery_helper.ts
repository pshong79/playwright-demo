import { type Page } from '@playwright/test';

export async function loadPage(page: Page) {
  await page.goto('https://www.saucedemo.com');
}