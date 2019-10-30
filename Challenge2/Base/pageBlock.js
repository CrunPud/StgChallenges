var By = require('selenium-webdriver').By;
var Until = require('selenium-webdriver').until;

function PageBlock(webdriver, parnt, localSpc, ordinl) {
    this.driver = webdriver;
    this.localSpec = localSpc;
    this.parent = parnt;
    this.ordinal = ordinl;
}

PageBlock.prototype.findElement = async function(locator){
    var elementToReturn = await this.parent.findElement();

    if(this.ordinal){
        elementToReturn = (await elementToReturn.findElements(this.localSpec))[this.ordinal];
    }
    else
        elementToReturn = await elementToReturn.findElement(this.localSpec);

    if(locator)
        return await elementToReturn.findElement(locator);
    else
        return elementToReturn;
}

PageBlock.prototype.findElements = async function(locator) {
    var elementToReturn = await this.parent.findElement();

    if(this.ordinal)
        elementToReturn = (await elementToReturn.findElements(this.localSpec))[this.ordinal];
    else
        elementToReturn = await elementToReturn.findElement(this.localSpec);

    if(locator)
        return await elementToReturn.findElements(locator);
    else
        return elementToReturn;
};

PageBlock.prototype.findBlocks = async function(locator, blockType) {
    var self = this;
    var driver = this.driver;
    console.debug("Finding blocks: " + blockType.name);
    console.debug("Inside block: " + this.constructor.name);
    if(locator){
        var blockArray = new Array();
        await this.findElements(locator)
            .then(function(elements){
                elements.forEach(function(element, i){
                    blockArray[i] = new blockType(driver, self, locator, i);
                });
            });

        console.debug("Found sub blocks: " + blockArray.length);

        return blockArray;
    }
    else
        return null;
}

module.exports = PageBlock;