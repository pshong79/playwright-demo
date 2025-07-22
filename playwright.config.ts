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

  // NOTE: The `projects` configuration allows you to run different sets of tests with specific configurations.
  //       If 'npx playwright test' is run without any arguments, it will run all projects and ONLY tests in those projects.
  //       To run all tests using projects, ensure all the tests are included in the `projects` array or create a separate 
  //       project that includes all tests.
  projects: [
    {
      name: 'api-tests',
      // NOTE: To run all API tests, you can use the `testMatch` option to specify the file pattern.
      //       This is useful if you want to run all API tests without using tags.
      //       To run specific API tests, use the `grep` option to filter by tags.
      //       If both `grep` and `testMatch` are used, the `grep` option will take precedence.
      testMatch: /api\.spec\.ts/
      // grep: /@api/
      
    },
    {
      name: 'end-to-end-tests',
      testMatch: /end-to-end\.spec\.ts/,

      use: {
        baseURL: 'https://www.saucedemo.com/'
      }
    },
    {
      name: 'fakerjs-tests',
      testMatch: /fakerjs\.spec\.ts/,
      use: {
        baseURL: 'https://www.automationexercise.com/'
      }
    },
    // {
    //   name: 'smoke-tests',
    //   grep: /@smoke/
    // },
  ]
});
