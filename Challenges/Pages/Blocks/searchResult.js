var PageBlock = require('../../Base/pageBlock');
var By = require('selenium-webdriver').By;
var Until = require('selenium-webdriver').until;
var Assert = require('chai').assert;

function SearchResult(webdriver, parent, localSpec, ordinal) {
	PageBlock.call(this, webdriver, parent, localSpec, ordinal);
}

SearchResult.prototype = Object.create(PageBlock.prototype);
SearchResult.prototype.constructor = SearchResult;

var Make = By.css("span[data-uname='lotsearchLotmake']");

SearchResult.prototype.getMake = async function() {
    var elem = await this.findElement(Make);
    return await elem.getText();
}

module.exports = SearchResult;
