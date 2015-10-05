/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="sandbox.ts" />
var Core = (function () {
    function Core() {
        this.domWrapper = {
            find: function (selector) {
                return $(selector);
            },
            wrap: function (element) {
                return $(element);
            }
        };
        this.utilitiesWrapper = {
            each: function () {
                return $.each;
            },
            grep: function () {
                return $.grep;
            },
            inArray: function () {
                return $.inArray;
            },
            merge: function () {
                return $.merge;
            }
        };
        this.cache = [];
        this.modules = [];
    }
    Core.prototype.dom = function () {
        return this.domWrapper;
    };
    Core.prototype.route = function (path) {
        if (typeof location === "undefined") {
            location = require("jsdom").jsdom().nodeLocation;
        }
        $(location).attr("href", path);
    };
    Core.prototype.utils = function () {
        return this.utilitiesWrapper;
    };
    Core.prototype.register = function (moduleId, creator, options) {
        this.modules[moduleId] = {
            creator: creator,
            instance: null,
            options: options || {}
        };
    };
    Core.prototype.start = function (moduleId) {
        this.modules[moduleId].instance = new (this.modules[moduleId].creator)(new (require("./sandbox").Sandbox)(this), this.modules[moduleId].options);
        this.modules[moduleId].instance.create();
    };
    Core.prototype.stop = function (moduleId) {
        var module = this.modules[moduleId];
        if (module.instance) {
            module.instance.destroy();
            module.instance = null;
        }
    };
    Core.prototype.startAll = function () {
        for (var moduleId in this.modules) {
            if (this.modules.hasOwnProperty(moduleId)) {
                this.start(moduleId);
            }
        }
    };
    Core.prototype.stopAll = function () {
        for (var moduleId in this.modules) {
            if (this.modules.hasOwnProperty(moduleId)) {
                this.stop(moduleId);
            }
        }
    };
    Core.prototype.subscribe = function (message, callback) {
        if (!this.cache[message]) {
            this.cache[message] = [];
        }
        this.cache[message].push(callback);
    };
    Core.prototype.publish = function (message, args) {
        for (var i = 0; i < this.cache[message].length; i++) {
            if (typeof args === "undefined") {
                args = [];
            }
            if (!(args instanceof Array)) {
                args = [args];
            }
            this.cache[message][i].apply(this, args);
        }
    };
    Core.prototype.setQuery = function (query) {
        $ = query;
    };
    return Core;
})();
exports.Core = Core;
