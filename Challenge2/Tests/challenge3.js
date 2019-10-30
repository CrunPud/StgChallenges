require('chromedriver');
const {Builder, Capabilities} = require("selenium-webdriver");
var CoPartHome = require('../Pages/coPartHome');
var CoPartSearch = require('../Pages/coPartSearch');
var expect = require('chai').expect;
const {forEach} = require('p-iteration');

describe("challenge3 suite", function(){    
    this.timeout(20000);
    var driver;
    var coPartHome;
    var coPartSearch;

    before(async function(){
        var chromeOptions = { 'args': [ '--start-maximized', 'disable-infobars']}
        driver = await new Builder()
            .forBrowser("chrome")
            .withCapabilities(Capabilities.chrome().set('goog:chromeOptions', chromeOptions))
            .build();

        coPartHome = new CoPartHome(driver);
        coPartSearch = new CoPartSearch(driver);
    });

    after(async function(done){
        driver.quit();

        done();
    });

    it("I open copart", async function(){
        await coPartHome.open("http://www.copart.com");
    });

    it("Prints all the popular items and their links", async function(){
        var makesModels = await coPartHome.mostPopularMakesModels();
        await forEach(makesModels, async mod => console.debug((await mod.getModelName()) + " " + (await mod.getLink())));
    });
});