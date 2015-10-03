/**
 * Created by Roy on 9/30/2015.
 */

/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />



export namespace Aurea {

    export class Core {

        private cache: any;
        private query = require("jQuery")(require("jsdom").jsdom().defaultView);

        constructor(){
            this.cache = [];
        }

        public dom = {
            find : (selector) => {
                return this.query.find(selector);
            },
            wrap : (element) => {
                return this.query.find(element);
            }
        };

        public utilities = {
            merge: () => {this.query.merge;},
            grep: () => {this.query.grep;},
            inArray: () => {this.query.inArray;},
            each: () => {this.query.each;}
        };


        public setQuery(query) {
            this.query = query;
        }

        public subscribe(message, callback) {
            if(! this.cache[message]) {
                this.cache[message] = [];
                this.cache[0] = [];
            }
            this.cache[message].push(callback);
        };

        public publish(message, args) {
            try {
                for(var i = 0; i < this.cache[message].length; i++) {
                    if( typeof  args === "undefined"){
                        args = [];
                    }
                    if (!(args instanceof Array)){
                        args = [args];
                    }
                    this.cache[message][i].apply(this,args);
                }
            }
            catch(err) {
                console.log(err);
            }

        }
    }
}
