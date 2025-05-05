// playwright.config.js

import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000, // Global timeout for each test (30 seconds)
  retries: 0, // No retries
  testDir: './features', // Main directory for feature files and tests
  use: {
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Browser viewport size
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure', // Record video only on failure
    screenshot: 'only-on-failure', // Take screenshots only on failure
    baseURL: 'https://parabank.parasoft.com/parabank/index.htm', 
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
    },
  ],
});
