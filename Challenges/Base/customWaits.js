function CustomWaits() {
};

CustomWaits.prototype.constructor = CustomWaits;

CustomWaits.prototype.angularHasFinished = function(driver){
    return function() {
        return driver.executeScript("return (window.angular !== undefined) && (angular.element(document).injector() !== undefined) && (angular.element(document).injector().get('$http').pendingRequests.length === 0)")
            .then(function(returnValue){
                console.debug("angular has finished: " + returnValue);
                return returnValue;
            });
    }
}

module.exports = CustomWaits;