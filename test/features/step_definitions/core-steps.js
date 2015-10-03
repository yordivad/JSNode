

module.exports = (function () {

    var mocker = require("jsmockito").JsMockito

    var yadda = require('yadda');
    var English = yadda.localisation.English;

    var Dictionary = yadda.Dictionary;

    var dictionary = new Dictionary()
        .define('message', /(\w+)/)
        .define('result', /(\w+)/);

    var scenary = new Dictionary();

    English.library(dictionary)

    var fn = null;
    var response = "";

    var assert = require("chai").assert;
    var Core = require('../../../src/core').Aurea.Core;
    var core = new Core();
    var wasExecuted = false;
    var queryMock = mocker.mock(require("jquery")(require('jsdom').jsdom().defaultView));

    return English.library()
        .given('a callback', function (next) {
            fn = function () {
                wasExecuted = true;
            }
            next();
        })
        .when('register a subscriber', function (next) {
            console.log(core);
            core.subscribe("my subscribe", fn);
            next();
        })
        .then('the callback is subscribe', function (next) {
           core.publish("my subscribe", "");
           assert.equal(true, wasExecuted, "the callback was reqister")
           next()
        })
        .given('register a $message with $result in the subscriber', function(message,result,done){
            core.subscribe(message, function(){
                response = result;
            });
            done();
        })
        .when('Execute the $message', function(message, done){
            core.publish(message);
            done();
        })
        .then('I got the result $result', function(result, done){
            assert.equal(response, result);
            done();
        })
        .given('a query Mock', function(done){

            mocker.when(queryMock).find("").thenReturn("object");
            core.setQuery(queryMock);
            done();
        })
        .when('execute a dom function', function(done){
            this.scenary["result-dom"] = core.dom.find("");
            done();
        })
        .then('verify queryMock is executed', function(done){
            var actual = this.scenary["result-dom"];
            assert.equal(actual, "object");
            done();
        })


})();
