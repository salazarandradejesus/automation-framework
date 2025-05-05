class AccountServices {

  constructor(page) {
    this.page = page;
    // Locators
    this.openNewAccountLink = page.locator('a[href*="openaccount.htm"]');
    this.accountsOverviewLink = page.locator('a[href*="overview.htm"]');
    this.transferFundsLink = page.locator('a[href*="transfer.htm"]');
    this.billPayLink = page.locator('a[href*="billpay.htm"]');
    this.findTransactionsLink = page.locator('a[href*="findtrans.htm"]');
    this.updateContactInfoLink = page.locator('a[href*="updateprofile.htm"]');
    this.requestLoanLink = page.locator('a[href*="requestloan.htm"]');
    this.logoutLink = page.locator('a[href*="logout.htm"]');
    
  }

  async clickOpenNewAccount() {
    await this.openNewAccountLink.click();
  }
  
  async clickAccountsOverview() {
    await this.accountsOverviewLink.click();
  }
  
  async clickTransferFunds() {
    await this.transferFundsLink.click();
  }
  
  async clickBillPay() {
    await this.billPayLink.click();
  }
  
  async clickFindTransactions() {
    await this.findTransactionsLink.click();
  }
  
  async clickUpdateContactInfo() {
    await this.updateContactInfoLink.click();
  }
  
  async clickRequestLoan() {
    await this.requestLoanLink.click();
  }
  
  async clickLogout() {
    await this.logoutLink.click();
  }
  
}

module.exports = AccountServices;

