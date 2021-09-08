# Storybook Test Runner

Storybook test runner turns all of your stories into executable tests.

It's currently a prototype that configures Jest to run smoke tests on your stories in either:

- **JSDOM** - render stories to JSDOM using TestingLibrary
- **Playwright** - render stories in a browser using Playwright

The goal of this prototype is to help evaluate both approaches: primarily for performance, but also to understand the general strengths and weaknesses.

## Install

To install the package, run:

```sh
yarn add @storybook/test-runner --dev
```

This simply installs the package in `node_modules`. Using the package is fully manual at this point.

## Configure

To use the addon, you need to manually configure it:

- Create a script in `package.json`
- Create a jest config for your use case

### JSDOM

Add a script to `package.json`:

```json
{
  "scripts": {
    "test-storybook:jsdom": "jest --config ./jsdom-jest.config.js"
  }
}
```

Then create a config file `jsdom-jest.config.js` that sets up your environment. For example:

```js
module.exports = {
  cacheDirectory: '.cache/jest',
  testMatch: ['**/*.stories.[jt]s?(x)'],
  moduleNameMapper: {
    // non-js files
    '\\.(jpg|jpeg|png|apng|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.js',
    '\\.(css|scss|stylesheet)$': '<rootDir>/mocks/styleMock.js',
  },
  transform: {
    '^.+\\.stories\\.[jt]sx?$': './jsdom/transform',
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
};
```

### Playwright

Add a script to `package.json`:

```json
{
  "scripts": {
    "test-storybook:playwright": "jest --config ./playwright-jest.config.js"
  }
}
```

Then create a config file `playwright-jest.config.js` that sets up your environment. For example:

```js
module.exports = {
  cacheDirectory: '.cache/jest',
  testMatch: ['**/*.stories.[jt]s?(x)'],
  moduleNameMapper: {
    // non-js files
    '\\.(jpg|jpeg|png|apng|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.js',
    '\\.(css|scss|stylesheet)$': '<rootDir>/mocks/styleMock.js',
  },
  transform: {
    '^.+\\.stories\\.[jt]sx?$': './playwright/transform',
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  preset: 'jest-playwright-preset',
  // globalSetup: './playwright/global-setup.js',
  // globalTeardown: './playwright/global-teardown.js',
  testEnvironment: './playwright/custom-environment.js',
};
```

> **NOTE:** The code currently assumes that your Storybook is ALREADY running on `process.env.STORYBOOK_PORT` which defaults to `6006`.

## Future work

In the future it will support the following features:

- 💨 Smoke test all stories
- ▶️ Test CSF3 play functions
- 🧪 Custom test functions
- 📄 Run addon reports
- ⚡️ Zero config setup