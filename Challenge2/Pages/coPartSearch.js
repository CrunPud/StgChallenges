var BasePage = require('../Base/basePage');
var By = require('selenium-webdriver').By;
var CustomWaits = require('../Base/customWaits');
var Until = require('selenium-webdriver').until;
var SearchResults = require('./Blocks/searchResult')

function CoPartSearch(webdriver) {
	BasePage.call(this, webdriver);
}

CoPartSearch.prototype = Object.create(BasePage.prototype);
CoPartSearch.prototype.constructor = CoPartSearch;

var Results = By.xpath(".//table[@id='serverSideDataTable']/tbody/tr");

CoPartSearch.prototype.searchResults = async function() {
    var custWait = new CustomWaits();
    await this.driver.wait(custWait.angularHasFinished(this.driver));
    await this.driver.wait(Until.elementsLocated(By.xpath(".//table[@id='serverSideDataTable']/tbody/tr")))
    return await this.findBlocks(Results, SearchResults);
}

module.exports = CoPartSearch;
