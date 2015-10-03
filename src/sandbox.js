var Aurea;
(function (Aurea) {
    "use strict";
    var Sandbox = (function () {
        function Sandbox(core) {
            this.core = core;
        }
        Sandbox.prototype.dom = function () {
            return core.dom();
        };
        Sandbox.prototype.publish = function (message, args) {
            this.core.publish(message, args);
        };
        Sandbox.prototype.subscribe = function (message, callback) {
            this.core.subscribe(message, callback);
        };
        return Sandbox;
    })();
    Aurea.Sandbox = Sandbox;
})(Aurea = exports.Aurea || (exports.Aurea = {}));
//# sourceMappingURL=sandbox.js.map