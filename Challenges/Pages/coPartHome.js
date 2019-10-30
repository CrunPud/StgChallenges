var BasePage = require('../Base/basePage');
var By = require('selenium-webdriver').By;
var Until = require('selenium-webdriver').until;
var PopularMakesModels = require('./Blocks/popularMakesModels');

function CoPartHome(webdriver) {
	BasePage.call(this, webdriver);
}

CoPartHome.prototype = Object.create(BasePage.prototype);
CoPartHome.prototype.constructor = CoPartHome;

var SearchBar = By.id("input-search");
var SearchButton = By.css("button[ng-click='search()']");
var MostPopularMakesModels = By.xpath(".//li[contains(@ng-repeat,'popularSearch')]")

CoPartHome.prototype.loaded = async function() {
	await this.driver.wait(Until.elementLocated(SearchBar));
}

CoPartHome.prototype.searchFor = async function(query) {
	await this.driver.findElement(SearchBar).sendKeys(query);
	await this.driver.findElement(SearchButton).click();
}

CoPartHome.prototype.mostPopularMakesModels = async function() {
	return await this.findBlocks(MostPopularMakesModels, PopularMakesModels);
}

module.exports = CoPartHome;
