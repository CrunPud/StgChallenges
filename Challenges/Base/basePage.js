var By = require('selenium-webdriver').By;

function BasePage(webdriver) {
    this.driver = webdriver;
    this.localSpec = By.css("body");
    this.page = this;
};

BasePage.prototype.constructor = BasePage;

BasePage.prototype.open = async function(url) {
	await this.driver.get(url);
	return this;
};

BasePage.prototype.findElement = async function(locator) {
    var elementToReturn = await this.driver.findElement(this.localSpec);
    if(locator)
        return await elementToReturn.findElement(locator);
    else
        return elementToReturn;
};

BasePage.prototype.findElements = async function(locator) {
    var elementToReturn = await this.driver.findElement(this.localSpec);
    if(locator)
        return await elementToReturn.findElements(locator);
    else
        return elementToReturn;
};

BasePage.prototype.findBlocks = async function(locator, blockType) {
    var self = this;
    var driver = this.driver;
    console.debug("Finding blocks: " + blockType.name);
    console.debug("On page: " + this.constructor.name);
    if(locator){
        var blockArray = new Array();
        await this.findElements(locator)
            .then(function(elements){
                elements.forEach(function(element, i){
                    blockArray[i] = new blockType(driver, self, locator, i);
                });
            });

        console.debug("Found blocks: " + blockArray.length);

        return blockArray;
    }
    else
        return null;
};

module.exports = BasePage;