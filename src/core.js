/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
var Aurea;
(function (Aurea) {
    "use strict";
    var Core = (function () {
        function Core() {
            var _this = this;
            this.domWrapper = {
                find: function (selector) {
                    return _this.query.find(selector);
                },
                wrap: function (element) {
                    return _this.query.find(element);
                }
            };
            this.utilitiesWrapper = {
                each: function () {
                    return _this.query.each;
                },
                grep: function () {
                    return _this.query.grep;
                },
                inArray: function () {
                    return _this.query.inArray;
                },
                merge: function () {
                    return _this.query.merge;
                }
            };
            this.cache = [];
            this.query = require("jQuery")(require("jsdom").jsdom().defaultView);
            this.modules = [];
        }
        Core.prototype.dom = function () {
            return this.domWrapper;
        };
        Core.prototype.utilities = function () {
            return this.utilitiesWrapper;
        };
        Core.prototype.setQuery = function (query) {
            this.query = query;
        };
        Core.prototype.register = function (moduleId, creator, options) {
            modules[moduleId] = {
                creator: creator,
                intance: null,
                options: options || {}
            };
        };
        Core.prototype.start = function (moduleId) {
            modules[moduleId].instance = new modules[moduleId].creator(new Sandbox(this), module[moduleId].options);
            modules[moduleId].instance.create();
        };
        Core.prototype.stop = function (moduleId) {
            module = modules[moduleId];
            if (module.instance) {
                module.instance.destroy();
                module.instance = null;
            }
        };
        Core.prototype.startAll = function () {
            for (var moduleId in modules) {
                if (modules.hasOwnProperty(moduleId)) {
                    this.start(moduleId);
                }
            }
        };
        Core.prototype.stopAll = function () {
            for (var moduleId in modules) {
                if (modules.hasOwnProperty(moduleId)) {
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
        return Core;
    })();
    Aurea.Core = Core;
})(Aurea = exports.Aurea || (exports.Aurea = {}));
//# sourceMappingURL=core.js.map