require('chromedriver');
const {Builder, Capabilities} = require("selenium-webdriver");
var CoPartHome = require('../Pages/coPartHome');
var CoPartSearch = require('../Pages/coPartSearch');
var expect = require('chai').expect;
const {find} = require('p-iteration');

describe("challenge2 suite", function(){    
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

    it("Page is loaded successfully", async function(){
        await coPartHome.loaded();
    });

    it("Search for exotics", async function(){
        await coPartHome.searchFor("exotics");
    });

    it("Verify that there exists a 'Porsche' in the exotics", async function(){
        var results = await coPartSearch.searchResults();

        var firstPorsche = await find(results, async result => (await result.getMake()).toLowerCase() === "porsche");

        // console.debug(await firstPorsche.getMake());
        expect(firstPorsche).to.be.ok;
    });
});