

module.exports = (function () {

    "use strict";

    var mocker = require("jsmockito").JsMockito,
        yadda = require('yadda'),
        helper = require("../../test.helper"),
        English = yadda.localisation.English,
        Dictionary = yadda.Dictionary,
        dictionary = new Dictionary()
            .define('message', /(\w+)/)
            .define('result', /(\w+)/),
        fn = null,
        response = "",
        assert = require("chai").assert,
        wasExecuted = false,
        jsdom = require('jsdom').jsdom(),
        window = jsdom.defaultView,
        location =  jsdom.nodeLocation,
        queryMock = mocker.mock(require("jquery")(window)),
        wasAlertMockExecuted = false,
        Core = require('../../../src/core').Aurea.Core,
        Sandbox = require('../../../src/sandbox').Aurea.Sandbox,
        core = new Core(Sandbox, location),
        alertMock = function () {
            return {
                create: function () {
                    wasAlertMockExecuted = true;
                }
            };
        };

    helper.init();

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
            core.setQuery(function () { return "object"; });
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
        })
        .given('a path and mock object', function (done) {
            mocker.when(queryMock).attr("href");
            core.setQuery(function () { return queryMock; });
            done();
        })
        .when('execute route', function (done) {
            core.route("#new");
            done();
        })
        .then('a mock is executed', function (done) {
            mocker.verify(queryMock, mocker.Verifiers.times(1)).attr("href");
            done();
        });

}());
