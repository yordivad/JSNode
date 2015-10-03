/**
 * Created by Roy on 9/30/2015.
 */
/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
var Aurea;
(function (Aurea) {
    var Core = (function () {
        function Core() {
            var _this = this;
            this.query = require("jQuery")(require("jsdom").jsdom().defaultView);
            this.dom = {
                find: function (selector) {
                    return _this.query.find(selector);
                },
                wrap: function (element) {
                    return _this.query.find(element);
                }
            };
            this.utilities = {
                merge: function () { _this.query.merge; },
                grep: function () { _this.query.grep; },
                inArray: function () { _this.query.inArray; },
                each: function () { _this.query.each; }
            };
            this.cache = [];
        }
        Core.prototype.setQuery = function (query) {
            this.query = query;
        };
        Core.prototype.subscribe = function (message, callback) {
            if (!this.cache[message]) {
                this.cache[message] = [];
                this.cache[0] = [];
            }
            this.cache[message].push(callback);
        };
        ;
        Core.prototype.publish = function (message, args) {
            try {
                for (var i = 0; i < this.cache[message].length; i++) {
                    if (typeof args === "undefined") {
                        args = [];
                    }
                    if (!(args instanceof Array)) {
                        args = [args];
                    }
                    this.cache[message][i].apply(this, args);
                }
            }
            catch (err) {
                console.log(err);
            }
        };
        return Core;
    })();
    Aurea.Core = Core;
})(Aurea = exports.Aurea || (exports.Aurea = {}));
//# sourceMappingURL=core.js.map