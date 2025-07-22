import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { returnDateArray } from '../helpers/test_helper';
import { SharedObjects } from '../support/shared/shared-objects';
import { Header } from '../support/automation-exercise/header';

test.describe('automation exercise - fakerjs tests', async () => {
  let sharedObjects: SharedObjects,
      header: Header

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const emailAddress = faker.internet.email({ firstName, lastName });
  const password = faker.internet.password({ length: 8, memorable: true });
  const birthDate = faker.date.birthdate({ mode: 'age', min: 18, max: 65 });
  const companyName = faker.company.name();
  const address = {
    street: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    // country: faker.location.country()
    country: 'United States' // Hardcoded for consistency in tests
  }
  // const address = faker.location.streetAddress();
  // const address2 = faker.location.secondaryAddress();
  // const city = faker.location.city();
  // const state = faker.location.state();
  // const zipCode = faker.location.zipCode();
  // const country = faker.location.country();
  // const country = 'United States'; // Hardcoded for consistency in tests
  const phoneNumber = faker.phone.number();

  test.beforeEach('load site', async ({ page }) => {
    sharedObjects = new SharedObjects(page);
    header = new Header(page);

    await sharedObjects.goToPage('/');
  });

  test.afterEach('close browser', async ({ page }) => {
    await page.close();
  });

  test('register account', async () => {
    console.log('register account test');

    const fullName = `${firstName} ${lastName}`;
    const dateArray = returnDateArray(birthDate);
    const accountCreatedText1 = 'Congratulations! Your new account has been successfully created!';
    const accountCreatedText2 = 'You can now take advantage of member privileges to enhance your online shopping experience with us.';

    // login page
    await header.clickHeaderMenu('Signup / Login');
    await sharedObjects.fillInputField('Name', fullName);
    await sharedObjects.fillInputFieldByLocator('[data-qa="signup-email"]', emailAddress);
    await sharedObjects.clickButton('Signup');

    // signup page
    await sharedObjects.assertFieldValue('Name *', fullName);
    await sharedObjects.assertFieldValue('Email *', emailAddress);

    await sharedObjects.fillInputField('Password *', password);

    await sharedObjects.selectDropdownOption('#days', dateArray[1]);
    await sharedObjects.selectDropdownOption('#months', dateArray[0]);
    await sharedObjects.selectDropdownOption('#years', dateArray[2]);

    await sharedObjects.fillInputField('First name *', firstName);
    await sharedObjects.fillInputField('Last name *', lastName);
    await sharedObjects.fillInputFieldByLocator('#company', companyName);
    await sharedObjects.fillInputField('Address *', address.street);
    await sharedObjects.fillInputField('Address 2', address.address2);
    await sharedObjects.fillInputField('City *', address.city);
    await sharedObjects.fillInputField('State *', address.state);
    await sharedObjects.fillInputFieldByLocator('#zipcode', address.zipCode);
    await sharedObjects.selectDropdownOption('#country', address.country);
    await sharedObjects.fillInputField('Mobile Number *', phoneNumber);

    await sharedObjects.clickButton('Create Account');

    // account created page
    await sharedObjects.assertHeadingIsVisible('ACCOUNT CREATED!');
    await sharedObjects.assertTextIsVisible(accountCreatedText1);
    await sharedObjects.assertTextIsVisible(accountCreatedText2);
    await sharedObjects.takeFullPageScreenshot('account-created');
    await sharedObjects.clickLink('Continue');

    await sharedObjects.assertPageURL('/');
  });

  test('login with created user', async () => {
    console.log('login with created user test');

    await sharedObjects.clickLink('Signup / Login');
    await sharedObjects.fillInputFieldByLocator('[data-qa="login-email"]', emailAddress);
    await sharedObjects.fillInputField('Password', password);
    await sharedObjects.clickButton('Login');

    await sharedObjects.assertTextIsVisible(`Logged in as ${firstName} ${lastName}`);
    await sharedObjects.takeFullPageScreenshot('logged-in');
  });
});
