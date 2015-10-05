/// <reference path="../sandbox.ts" />
/// <reference path="../../typings/requirejs/require.d.ts" />
/// <reference path="../imodule.ts" />
var Alert = (function () {
    function Alert(sandbox) {
        this.sandbox = sandbox;
    }
    Alert.prototype.create = function () {
        var _this = this;
        this.sandbox.subscribe("alert", function () {
            _this.sandbox.alert({ message: "Good Job", title: "SCM Architecture" });
        });
    };
    Alert.prototype.destroy = function () {
    };
    return Alert;
})();
exports.Alert = Alert;
