const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

Before(async function (scenario) {
  const featureName = scenario.gherkinDocument.feature.name;
  const scenarioName = scenario.pickle.name;

  console.log(`\nFeature: ${featureName} ===`);
  console.log(`Scenario: ${scenarioName}\n`);

  // Launch browser
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  // Close browser
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});
