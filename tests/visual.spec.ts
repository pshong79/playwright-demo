import { test, expect } from '@playwright/test';
import { SharedObjects } from '../support/shared/shared-objects';
import { LoginPage } from '../support/saucedemo/login-page';

test.describe('saucedemo - visual tests', () => {
  let sharedObjects: SharedObjects,
      loginPage: LoginPage;
  
  // EXECUTION: The initial run needs to be done with the 'standard_user' credentials to establish
  // a baseline to compare subsequent runs against. All subsequent runs should be run with VISUAL_USER_ID.

  // The baseline test to get the screenshot should be done locally
  // and then pushed up into the repository so that when it runs in 
  // DevOps as a part of CI/CD, we don't have to get try and get it 
  // there.

  // const USERID = process.env.STANDARD_USER_ID;;  
  const USERID = process.env.VISUAL_USER_ID;
  const PASSWORD = process.env.PASSWORD;

  test.beforeEach('login', async ({ page }) => {
    sharedObjects = new SharedObjects(page);
    loginPage = new LoginPage(page);

    if (!USERID || !PASSWORD) {
      throw new Error('USER_ID and PASSWORD environment variables must be set');
    }

    await sharedObjects.goToPage('/');
    await loginPage.login(USERID, PASSWORD);
  });

  test.afterEach('logout', async () => {
    await sharedObjects.goToPage('/');
  });

  test.skip('inventory page', async ({ page }) => {
    await sharedObjects.goToPage('/inventory.html');

    // Mask price elements to avoid visual test failures due to dynamic pricing
    await expect(page).toHaveScreenshot('inventory.png', {
      mask: [
        page.locator('.inventory_item_price')
      ],
      maxDiffPixels: 600  // Or a bit more like 550 for safety
    });
  });
});
