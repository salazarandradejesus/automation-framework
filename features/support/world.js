// support/world.js
const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld {
  async openBrowser() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext({
      storageState: 'storage/state.json'
    });
    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }

  get baseUrl() {
    return process.env.BASE_URL || 'https://parabank.parasoft.com';
  }
}

setWorldConstructor(CustomWorld);
