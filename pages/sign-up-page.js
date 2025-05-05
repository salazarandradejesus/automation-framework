const { faker } = require('@faker-js/faker');

class SignUpPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    // Locators
    this.registerOption = page.locator('a[href*="register.htm"]');
    this.firstNameInput = page.locator('input#customer\\.firstName');
    this.lastNameInput = page.locator('input#customer\\.lastName');
    this.addressInput = page.locator('input#customer\\.address\\.street');
    this.cityInput = page.locator('input#customer\\.address\\.city');
    this.stateInput = page.locator('input#customer\\.address\\.state');
    this.zipInput = page.locator('input#customer\\.address\\.zipCode');
    this.phoneInput = page.locator('input#customer\\.phoneNumber');
    this.ssnInput = page.locator('input#customer\\.ssn');
    this.usernameInput = page.locator('input#customer\\.username');
    this.passwordInput = page.locator('input#customer\\.password');
    this.confirmPasswordInput = page.locator('input#repeatedPassword');
    this.registerButton = page.locator('input[value="Register"]');
    this.successMessage = page.locator('h1:has-text("Welcome")');
  }

  async clickRegisterOption() {
    await this.registerOption.click();
  }

  /**
   * Fills the registration form with provided user data.
   * @param {{
   *   firstName: string,
   *   lastName: string,
   *   address: string,
   *   city: string,
   *   state: string,
   *   zip: string,
   *   phone: string,
   *   ssn: string,
   *   password: string,
   *   confirmPassword: string
   * }} data
   */
  async fillRegistrationForm(data) {
    const username = faker.internet.username().toLowerCase();

    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.addressInput.fill(data.address);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.zipInput.fill(data.zip);
    await this.phoneInput.fill(data.phone);
    await this.ssnInput.fill(data.ssn);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword);
  }

  async submitRegistration() {
    await this.registerButton.click();
  }

  async usernameDuplicated() {

    const usernameDuplicated = faker.internet.username().toLowerCase();

    await this.usernameInput.fill(usernameDuplicated);

  }
}

module.exports = SignUpPage;