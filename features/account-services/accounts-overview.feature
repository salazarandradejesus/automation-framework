Feature: Open New Account
  As a logged-in customer
  I want to open a new Checking or Savings account
  So that I can manage my funds separately

  Background:
    Given I am on the home page
    And I click the "Register" option
    And I fill in all required fields of the registration form with valid data
    And I click the "Register" button
    And an account should be created

  @account-overview  
  Scenario: Navigate to the Open New Account page
    Given I navigate to the Open New Account page
    Then I should see the title "Open New Account"
    
  @account-overview @account-table
  Scenario: Verify account information including Balance and Available Amount
    Given I am on the Accounts Overview page
    When I view the account Overview Table
    Then I should see the account number, balance, and available amount correctly displayed

  Scenario: Verify account details
    Given I am on the Accounts Overview page
    When I click on the account number
    Then I should see the Account Details