/// <reference path="../sandbox.ts" />
/// <reference path="../../typings/requirejs/require.d.ts" />
/// <reference path="../imodule.ts" />
var Alert = (function () {
    function Alert(sandbox) {
        this.sandbox = sandbox;
        this.handler = require("./libs/sweetalert");
    }
    Alert.prototype.create = function () {
        var _this = this;
        this.sandbox.subscribe("alert", function () {
            _this.handler("Good job!", "You clicked the button!", "success");
        });
    };
    Alert.prototype.destroy = function () {
    };
    return Alert;
})();
exports.Alert = Alert;
