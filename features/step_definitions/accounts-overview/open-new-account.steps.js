const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AccountServices = require('../../../pages/account-services-page');

Given('I navigate to the Open New Account page', async function () {
  console.log('Navigating to the "Open New Account Page"')
  
  accountServices = new AccountServices(this.page);
  await accountServices.clickOpenNewAccount();

});

When('I select {string} as the account type', async function (accountType) {
  console.log(`Selecting account type: ${accountType}`);

  await this.page.selectOption('select#type', accountType.toUpperCase());
  await this.page.waitForTimeout(500);

});

When('I choose my funding account', async function () {

  const fundingAccount = await this.page.locator('select#fromAccountId option').nth(0).getAttribute('value');

  console.log(`Using funding account ID: ${fundingAccount}`);

  await this.page.selectOption('select#fromAccountId', fundingAccount);
  this.fundingAccountId = fundingAccount;
  await this.page.waitForTimeout(500);
});

When('I click the "Open New Account" button on the open account form', async function () {
  const openNewAccountBtn = this.page.locator('input[type="button"][value="Open New Account"]');

  await openNewAccountBtn.waitFor({ state: 'visible' });
  await openNewAccountBtn.click();

  console.log('Clicked "Open New Account" button');
});


Then('I should see the confirmation message {string}', { timeout: 15000 }, async function (message) {
  console.log(`Waiting for confirmation message: "${message}"`);

  const titleLocator = this.page.getByText('Account Opened!')

  await titleLocator.waitFor({ state: 'visible', timeout: 10000 });

  const title = await titleLocator.textContent();
  expect(title).toContain(message);

  console.log('Confirmation message is visible and correct');
  await this.page.waitForTimeout(1000);
});


Then('I should see {string}', async function (text) {
  console.log(`Checking for presence of text: "${text}"...`);
  const content = await this.page.content();
  expect(content).toContain(text);
  console.log('Text found on the page');
});

Then('I should see a new account number displayed as digits', async function () {
  console.log('Looking for the new account number...');

  const newAccountId = await this.page.locator('a[href*="activity"]').textContent();
  const trimmedId = newAccountId.trim();

  console.log(`Found account number: ${trimmedId}`);
  expect(trimmedId).toMatch(/^\d+$/);
  console.log('Account number is numeric');
});
