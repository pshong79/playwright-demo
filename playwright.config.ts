import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  use: {
    // sets the custom data attribute for test elements
    testIdAttribute: 'data-test',

    ...devices['Desktop Chrome'],
    baseURL: 'https://www.saucedemo.com/',

    // NOTE: Header values for API tests can be set here or in the individual test files.
    //       Setting them here would apply them globally to all API tests and could be 
    //       overridden in the individual test files, if needed.
    // extraHTTPHeaders: {
    //   'x-api-key': 'reqres-free-v1',
    // },

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  // NOTE: To run subsets of tests, using projects is one option. However, the better option maybe to grep.
  //       Grep allows you to filter tests by tags, which can be more flexible than projects.
  //       Projects can be useful if you want to run different configurations of tests, such as
  //       running tests on different browsers or devices, or running different sets of tests.
  // projects: [
  //   {
  //     name: 'smoke-tests',
  //     grep: /@smoke/
  //   },
  //   {
  //     name: 'api-tests',
  //     // grep: /@api/
  //     // NOTE: To run all API tests, you can use the `testMatch` option to specify the file pattern.
  //     //       This is useful if you want to run all API tests without using tags.
  //     //       To run specific API tests, use the `grep` option to filter by tags.
  //     //       If both `grep` and `testMatch` are used, the `grep` option will take precedence.
  //     testMatch: /api\.spec\.ts/,
  //   },
  //   {
  //     name: 'end-to-end-tests',
  //     testMatch: /end-to-end\.spec\.ts/,

  //     use: {
  //       baseURL: 'https://www.saucedemo.com/'
  //     }
  //   }
  // ]
});
