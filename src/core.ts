

/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

export namespace Aurea {

    "use strict";

    export class Core {

        private cache: any;
        private query: jQuery;
        private modules: any;
        private domWrapper = {
            find : (selector) => {
                return this.query.find(selector);
            },
            wrap : (element) => {
                return this.query.find(element);
            }
        };

        private  utilitiesWrapper = {
            each: () => {
                return this.query.each;
            },
            grep: () => {
                return this.query.grep;
            },
            inArray: () => {
                return this.query.inArray;
            },
            merge: () => {
                return this.query.merge;
            }
        };

        constructor() {
            this.cache = [];
            this.query = require("jQuery")(require("jsdom").jsdom().defaultView);
            this.modules = [];
        }

        public dom() {
            return this.domWrapper;
        }

        public utilities() {
            return this.utilitiesWrapper;
        }

        public setQuery(query) {
            this.query = query;
        }

        public register(moduleId, creator, options) {
            modules[moduleId] = {
                creator: creator,
                intance: null,
                options: options || {}
            };
        }

        public start(moduleId) {
            modules[moduleId].instance = new modules[moduleId].creator(new Sandbox(this), module[moduleId].options);
            modules[moduleId].instance.create();
        }

        public stop(moduleId) {
            module = modules[moduleId];
            if (module.instance) {
                module.instance.destroy();
                module.instance = null;
            }
        }

        public startAll() {
            for (var moduleId in modules) {
                if (modules.hasOwnProperty(moduleId)) {
                    this.start(moduleId);
                }
            }
        }

        public stopAll() {
            for (var moduleId in modules) {
                if (modules.hasOwnProperty(moduleId)) {
                    this.stop(moduleId);
                }
            }
        }

        public subscribe(message, callback) {
            if (! this.cache[message]) {
                this.cache[message] = [];
            }
            this.cache[message].push(callback);
        }

        public publish(message, args) {

            for (var i = 0; i < this.cache[message].length; i++) {
                if (typeof  args === "undefined") {
                    args = [];
                }
                if (!(args instanceof Array)) {
                    args = [args];
                }
                this.cache[message][i].apply(this, args);
            }
        }

        /*
        public unsubscribe() {

        }
        */
    }
}
