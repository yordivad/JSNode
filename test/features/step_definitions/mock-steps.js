

var English = require('yadda').localisation.English;

module.exports = (function () {

    "use strict";

    return English.library()
        .given(/^Mock Object$/, function (next) {
            next();
        })
        .when(/^Execute Mock$/, function (next) {
            next();
        })
        .then(/^Test Mock$/, function (next) {
            next();
        });
}());
