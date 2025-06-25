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

  // Projects can be used to run tests in different browsers or configurations.
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   }
});
