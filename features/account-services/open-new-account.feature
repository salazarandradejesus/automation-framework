Feature: Open New Account
  In order to start using a new bank account
  As a registered customer
  I want to open a new Checking or Savings account with a minimum deposit

  Background:
    Given I am on the home page
    And I click the "Register" option
    And I fill in all required fields of the registration form with valid data
    And I click the "Register" button
    And an account should be created

  @account-open
  Scenario Outline: Open a new <AccountType> account
    Given I navigate to the Open New Account page
    And I select "<AccountType>" as the account type
    And I choose my funding account
    And I click the "Open New Account" button on the open account form
    Then I should see the confirmation message "Account Opened!"
    And I should see "Congratulations, your account is now open."
    And I should see a new account number displayed as digits

    Examples:
      | AccountType |
      | CHECKING    |
      | SAVINGS     |