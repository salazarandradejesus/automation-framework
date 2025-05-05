const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SignUpPage = require('../../pages/sign-up-page');

let signUpPage;

Given('I am on the home page', { timeout: 10000 }, async function () {
  console.log('Navigating to home page...');
  signUpPage = new SignUpPage(this.page);
  await this.page.goto(this.baseUrl);
  console.log('✅ Reached home page.');
});

When('I click the {string} option', async function (option) {
  console.log(`Clicking the "${option}" option...`);
  if (option === 'Register') {
    signUpPage = new SignUpPage(this.page);
    await signUpPage.clickRegisterOption();
    console.log('✅ Clicked Register option.');
  }
});

When('I fill in all required fields of the registration form with valid data', async function () {
  console.log('Filling in registration form with valid data...');
  await signUpPage.fillRegistrationForm({
    firstName: 'Harry',
    lastName: 'Potter',
    address: '4 Privet Drive',
    city: 'Little Whinging',
    state: 'Surrey',
    zip: 'HP11 4DR',
    phone: '01227272436',
    ssn: '000000001',
    username: 'admin',
    password: 'Magic123!',
    confirmPassword: 'Magic123!'
  });
  console.log('✅ Registration form completed.');
});

When('I click the {string} button', async function (button) {
  console.log(`Clicking the "${button}" button...`);
  if (button === 'Register') {
    await signUpPage.submitRegistration();

    const userDuplicated = this.page.getByText('This username already exists.')

    if (userDuplicated === 'This username already exists.') {

    await signUpPage.usernameDuplicated();
      
    }

    console.log('✅ Clicked Register button.');
  }
});

Then('an account should be created', async function () {
  console.log('Verifying account creation...');
  await expect(signUpPage.successMessage).toBeVisible();
  console.log('✅ Account creation confirmed.');
});

Then('I save the session state', async function () {
  console.log('Saving session state to storage/state.json...');
  await this.context.storageState({ path: 'storage/state.json' });
  console.log('✅ Session state saved.');
});
