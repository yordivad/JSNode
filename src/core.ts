

/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="sandbox.ts" />

export class Core {

    private cache: any;
    private query: any;
    private modules: any;

    private domWrapper = {
        find: (selector) => {
            return this.query.find(selector);
        },
        wrap: (element) => {
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
        this.modules[moduleId] = {
            creator: creator,
            instance: null,
            options: options || {}
        };
    }

    public start(moduleId) {
        this.modules[moduleId].instance = new (this.modules[moduleId].creator)(new (require("./sandbox").Sandbox)(this), this.modules[moduleId].options);
        this.modules[moduleId].instance.create();
    }

    public stop(moduleId) {
        var module = this.modules[moduleId];
        if (module.instance) {
            module.instance.destroy();
            module.instance = null;
        }
    }

    public startAll() {
        for (var moduleId in this.modules) {
            if (this.modules.hasOwnProperty(moduleId)) {
                this.start(moduleId);
            }
        }
    }

    public stopAll() {
        for (var moduleId in this.modules) {
            if (this.modules.hasOwnProperty(moduleId)) {
                this.stop(moduleId);
            }
        }
    }

    public subscribe(message, callback) {
        if (!this.cache[message]) {
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

