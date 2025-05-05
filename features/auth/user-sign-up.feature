Feature: User Sign Up
  As a Parabank user
  I want to sign up with valid credentials
  So that I can access my account overview

  Scenario: Successful Sign Up
    Given I am on the home page  
    When I click the "Register" option  
    And I fill in all required fields of the registration form with valid data  
    And I click the {string} button 
    Then an account should be created
