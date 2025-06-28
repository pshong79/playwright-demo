import { test } from '@playwright/test';
import { SharedObjects } from '../support/shared/shared-objects';
import { Header } from '../support/shared/header';
import { LoginPage } from '../support/shared/login-page';
import { ProductsPage } from '../support/products-page';

test.describe('saucedemo - end-to-end tests', async () => {
  let sharedObjects: SharedObjects,
      header: Header,
      loginPage: LoginPage,
      productsPage: ProductsPage;

  test.beforeEach('login', async ({ page }) => {
    const USERID = process.env.USER_ID;
    const PASSWORD = process.env.PASSWORD;

    sharedObjects = new SharedObjects(page);
    header = new Header(page);
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    if (!USERID || !PASSWORD) {
      throw new Error('USER_ID and PASSWORD environment variables must be set');
    }

    await sharedObjects.goToPage('/');
    await loginPage.login(USERID, PASSWORD);
  });

  test.afterEach('close browser', async ({ page }) => {
    await page.close();
  });

  test('add item to cart and checkout', { tag: '@smoke' }, async () => {
    console.log('Running end-to-end test: add item to cart and checkout');
    // add item to cart
    await header.assertCartItemCountIsNotVisible();
    await productsPage.addSauceLabsBoltTShirtToCart();
    await productsPage.assertRemoveButtonSauceLabsBoltTShirtIsVisible();
    await header.assertCartItemCount('1');

    // go to cart and checkout
    await header.clickCartButton();
    await sharedObjects.assertCartItem('Sauce Labs Bolt T-Shirt');
    await sharedObjects.clickButton('Checkout');

    // checkout: your information
    await sharedObjects.fillInputField('First Name', 'Emergent');
    await sharedObjects.fillInputField('Last Name', 'QA');
    await sharedObjects.fillInputField('Zip/Postal Code', '12345');
    await sharedObjects.clickButton('Continue');

    // checkout: overview
    await sharedObjects.assertCartItem('Sauce Labs Bolt T-Shirt');
    await sharedObjects.clickButton('Finish');

    // checkout complete
    await sharedObjects.assertHeadingIsVisible('Thank you for your order!');
    await sharedObjects.takeFullPageScreenshot('checkout-complete');
    await sharedObjects.clickButton('Back Home');
  });
});
