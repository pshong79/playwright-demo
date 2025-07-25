# Description
As I continue to develop my skillset as a Quality Assurance (QA) Engineer / Software Development Engineer in Test (SDET), the intention is that this project will represent my learnings and growing abilities with the Playwright automation framework.

This project is created using Playwright and TypeScript.

# Contents
This project contains examples of:
* End-to-end UI testing
* Tests using `faker-js` to generate test data
* API testing
* Successfully integrating in to CI/CD pipelines using:
  * Azure DevOps
    * Note: Only the setup to successfully execute a pipeline in Azure DevOps can be viewed. The files are stored under `pipelines` under the root directory. 
  * GitHub Actions
* Tagging tests and running tagged tests using projects

# Prerequisites
Before setting up this project, the following dependencies will need to be installed:
* [Git](https://git-scm.com/)
* [NodeJS](https://nodejs.org/)

# Setup
To set up this project:
1. Clone the repository.
2. `cd` into the directory.
3. Install npm libraries:
   * `dotenv`:
     ```
     $ npm i dotenv
     ```
   * `faker-js`:
     ```
     npm i @fakerjs/faker`
     ```
4. Install all the npm dependencies:
   ```
   $ npm install
   ```
   This will install all the required dependencies that are present in the `package.json` file.

5. Install Playwright using the following command:
   ```
   $ npx playwright install
   ```
   This will download the necessary Playwright browsers.

# Execute tests
Tests can be executed with:
```
$ npx playwright test
```

To execute a specific test file, run:
```
$ npx playwright test <path_to_test_file>
```

To execute a specific test, run:
```
$ npx playwright test <path_to_test_file>:<line_number_of_test>
```

To execute a specific project, run:
```
$ npx playwright test --project=<project_name>
```

# Test Report
The test execution report can be viewed with:
```
npx playwright show-report
```
