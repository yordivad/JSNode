module.exports = (function () {
    "use strict";

    var mocker = require("jsmockito").JsMockito,
        yadda = require('yadda'),
        English = yadda.localisation.English,
        Dictionary = yadda.Dictionary,
        dictionary = new Dictionary(),
        path = "../../../src/",
        UserController = require(path + 'modules/controllers/usercontroller').Aurea.UserController,
        scopeMock = mocker.mock(function () {
            return {
                users: {},
                newUser: "",
                $watch: function () { console.log("calling watch function"); }
            };
        }),
        serviceMock = mocker.mock(require(path + 'modules/services/userservice').Aurea.UserService),
        locationMock = mocker.mock(function () {
            return {
                path: function () { console.log("calling watch function"); }
            };
        });

    English.library(dictionary);

    return English.library()
        .given("a scope", function (next) {
            var controller = new UserController(scopeMock, locationMock, serviceMock, null);
            this.scenary.controller = controller;
            next();
        })
        .when("i add new user", function (next) {
            this.scenary.controller.addUser();
            next();
        })
        .then("the service needs to be called", function (next) {
            //mocker.verify(scopeMock, mocker.Verifiers.times(2));
            next();
        });

}());