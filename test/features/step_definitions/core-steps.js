module.exports = (function () {

    "use strict";

    var mocker = require("jsmockito").JsMockito,
        yadda = require('yadda'),
        English = yadda.localisation.English,
        Dictionary = yadda.Dictionary,
        dictionary = new Dictionary()
            .define('message', /(\w+)/)
            .define('result', /(\w+)/),
        fn = null,
        response = "",
        assert = require("chai").assert,
        Core = require('../../../src/core').Core,
        core = new Core(),
        wasExecuted = false,
        queryMock = mocker.mock(require("jquery")(require('jsdom').jsdom().defaultView)),
        wasAlertMockExecuted = false,
        alertMock = function () {
            return {
                create: function () {
                    wasAlertMockExecuted = true;
                }
            };
        };

    English.library(dictionary);

    return English.library()
        .given('a callback', function (next) {
            fn = function () {
                wasExecuted = true;
            };
            next();
        })
        .when('register a subscriber', function (next) {
            console.log(core);
            core.subscribe("my subscribe", fn);
            next();
        })
        .then('the callback is subscribe', function (next) {
            core.publish("my subscribe", "");
            assert.equal(true, wasExecuted, "the callback was reqister");
            next();
        })
        .given('register a $message with $result in the subscriber', function (message, result, done) {
            core.subscribe(message, function () {
                response = result;
            });
            done();
        })
        .when('Execute the $message', function (message, done) {
            core.publish(message);
            done();
        })
        .then('I got the result $result', function (result, done) {
            assert.equal(response, result);
            done();
        })
        .given('a query Mock', function (done) {

            mocker.when(queryMock).find("").thenReturn("object");
            core.setQuery(queryMock);
            done();
        })
        .when('execute a dom function', function (done) {
            this.scenary["result-dom"] = core.dom().find("");
            done();
        })
        .then('verify queryMock is executed', function (done) {
            var actual = this.scenary["result-dom"];
            assert.equal(actual, "object");
            done();
        })
        .given('a module', function (done) {
            this.scenary["module-item"] = alertMock;
            done();
        })
        .when('register the module', function (done) {
            core.register("alert", this.scenary["module-item"]);
            core.startAll();
            done();
        })
        .then('a module is register', function (done) {
            assert.equal(wasAlertMockExecuted, true);
            done();
        });
}());
