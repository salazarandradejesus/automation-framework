const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AccountServices = require('../../../pages/account-services-page');

let accountServices;

Given('I am on the Accounts Overview page', async function () {
  console.log('Navigating to the "Open New Account Page"')

  accountServices = new AccountServices(this.page);
  await accountServices.clickAccountsOverview();
});


Then('I should see the title {string}', async function (expectedTitle) {
  const title = await this.page.textContent('h1');
  expect(title).toContain(expectedTitle);

  console.log(`The title of this page is: ${expectedTitle} `)
});

When('I view the account Overview Table', async function () {
  
  const AccountsOverviewTable = this.page.locator('#accountTable');

  await expect(AccountsOverviewTable).toBeVisible();

  console.log('The table is visible')
});

Then('I should see the account number, balance, and available amount correctly displayed', async function () {
  await this.page.waitForSelector('#accountTable tbody tr');
  const rows = this.page.locator('#accountTable tbody tr');
  const count = await rows.count();

  console.log(`\n✅ Total rows found: ${count}`);

  const firstRow = rows.nth(0);
  const account = (await firstRow.locator('td').nth(0).textContent())?.trim();
  const balance = (await firstRow.locator('td').nth(1).textContent())?.trim();
  const available = (await firstRow.locator('td').nth(2).textContent())?.trim();

  console.log(`Captured → Account=${account}, Balance=${balance}, Available=${available}`);

  // Here we save the data to use it in other steps
  this.accountInfo = {
    account,
    balance,
    available,
  };

  console.log('Account info saved in context for later verification');
});

const { expect } = require('@playwright/test');

Then('I should see the Account Details', async function () {
  const { account, balance, available } = this.accountInfo;

  await this.page.waitForSelector('table tbody tr');
  const rows = this.page.locator('table tbody tr');
  const count = await rows.count();

  console.log(`\n🔎 Looking for row with: Account=${account}, Balance=${balance}, Available=${available}`);

  let matchFound = false;

  for (let i = 0; i < count; i++) {
    const row = rows.nth(i);
    const rowAccount = (await row.locator('td').nth(0).textContent())?.trim();
    const rowBalance = (await row.locator('td').nth(1).textContent())?.trim();
    const rowAvailable = (await row.locator('td').nth(2).textContent())?.trim();

    console.log(`Row ${i + 1}: Account=${rowAccount}, Balance=${rowBalance}, Available=${rowAvailable}`);

    if (rowAccount === account && rowBalance === balance && rowAvailable === available) {
      matchFound = true;
      break;
    }
  }

  expect(matchFound).toBe(true);
  console.log('The Account Details match the captured values');
});
