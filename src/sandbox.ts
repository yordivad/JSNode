/// <reference path="_all.ts" />

namespace Aurea {

    export class Sandbox {

        private core: any;

        constructor(core: any) {
            this.core = core;
        }

        public dom() {
            return this.core.dom();
        }

        public utils() {
            return this.core.utils();
        }

        public alert(item: any) {
            this.core.alert().show(item);
        }

        publish(message, args) {
            this.core.publish(message, args);
        }

        subscribe(message, callback) {
            this.core.subscribe(message, callback);
        }
    }
}
