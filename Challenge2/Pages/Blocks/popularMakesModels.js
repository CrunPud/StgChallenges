var PageBlock = require('../../Base/pageBlock');
var By = require('selenium-webdriver').By;
var Until = require('selenium-webdriver').until;
var Assert = require('chai').assert;

function PopularMakesModels(webdriver, parent, localSpec, ordinal) {
	PageBlock.call(this, webdriver, parent, localSpec, ordinal);
}

PopularMakesModels.prototype = Object.create(PageBlock.prototype);
PopularMakesModels.prototype.constructor = PopularMakesModels;

var Make = By.css("a");

PopularMakesModels.prototype.getModelName = async function() {
    var elem = await this.findElement(Make);
    return await elem.getText();
}

PopularMakesModels.prototype.getLink = async function() {
    var elem = await this.findElement(Make);
    return await elem.getAttribute("href");
}

module.exports = PopularMakesModels;