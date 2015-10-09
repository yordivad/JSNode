/// <reference path="_all.ts" />

namespace Aurea {

    export class Core {

        private cache: any;

        private modules: any;

        private domWrapper = {
            find: (selector) => {
                return $(selector);
            },
            wrap: (element) => {
                return $(element);
            }
        };

        private  utilitiesWrapper = {
            each: () => {
                return $.each;
            },
            grep: () => {
                return $.grep;
            },
            inArray: () => {
                return $.inArray;
            },
            merge: () => {
                return $.merge;
            }
        };

        private  alertWrapper = {
            show: (item: any) => {
                swal(item.title, item.message, "success");
            }
        };

        private Sandbox : any;
        private location : any;

        constructor(Sanbox: any, location: any) {
            this.cache = [];
            this.modules = [];
            this.Sandbox = Sanbox;
            this.location = location;
        }

        public dom() {
            return this.domWrapper;
        }

        public alert() {
            return this.alertWrapper;
        }

        public route(path: string) {
            $(this.location).attr("href", path);
        }

        public utils() {
            return this.utilitiesWrapper;
        }

        public register(moduleId, creator, options) {
            this.modules[moduleId] = {
                creator: creator,
                instance: null,
                options: options || {}
            };
        }

        public start(moduleId) {
            this.modules[moduleId].instance = new (this.modules[moduleId].creator)(new this.Sandbox(this), this.modules[moduleId].options);
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

        public setQuery(query) {
            $ = query;
        }

        /*
         public unsubscribe() {

         }
         */
    }
}
