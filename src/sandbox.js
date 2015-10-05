var Sandbox = (function () {
    function Sandbox(core) {
        this.core = core;
    }
    Sandbox.prototype.dom = function () {
        return this.core.dom();
    };
    Sandbox.prototype.utils = function () {
        return this.core.utils();
    };
    Sandbox.prototype.publish = function (message, args) {
        this.core.publish(message, args);
    };
    Sandbox.prototype.subscribe = function (message, callback) {
        this.core.subscribe(message, callback);
    };
    return Sandbox;
})();
exports.Sandbox = Sandbox;
