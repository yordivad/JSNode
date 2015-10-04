/// <reference path="../sandbox.ts" />
/// <reference path="../../typings/requirejs/require.d.ts" />
/// <reference path="../imodule.ts" />
var Alert = (function () {
    function Alert(sandbox) {
        this.sandbox = sandbox;
    }
    Alert.prototype.create = function () {
        var _this = this;
        this.handler = require("../libs/sweetalert");
        this.sandbox.subscribe("alert", function () {
            _this.handler.swal("Here's a message!");
        });
    };
    Alert.prototype.destroy = function () {
    };
    return Alert;
})();
exports.Alert = Alert;
//# sourceMappingURL=alert.js.map