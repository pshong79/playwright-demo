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

  async fillInputFieldByLocator(locator: string, value: string): Promise<void> {
    const inputField = this.page.locator(locator);
    await inputField.fill(value);
  }

  async selectDropdownOption(selector: string, optionValue: string): Promise<void> {
    const dropdown = this.page.locator(selector);
    await dropdown.selectOption({ label: optionValue });
  }

  async clickLink(linkText: string): Promise<void> {
    const link = this.page.getByRole('link', { name: linkText });
    await link.click();
  }

  async clickButton(buttonText: string): Promise<void> {
    const button = this.page.getByRole('button', { name: buttonText });
    await button.click();
  }

  async assertHeadingIsVisible(headerText: string): Promise<void> {
    const header = this.page.getByRole('heading', { name: headerText });
    await expect(header).toBeVisible();
  }

  async assertTextIsVisible(text: string): Promise<void> {
    const textElement = this.page.getByText(text);
    await expect(textElement).toBeVisible();
  }

  async takeFullPageScreenshot(screenshotName: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${screenshotName}.png`, fullPage: true });
  }

  async assertFieldValue(fieldName: string, expectedValue: string): Promise<void> {
    const inputField = this.page.getByRole('textbox', { name: fieldName , exact: true });
    await expect(inputField).toHaveValue(expectedValue);
  }

  async assertPageURL(expectedUrl: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  }
}