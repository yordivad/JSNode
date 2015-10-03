

export namespace  Aurea {

    "use strict";

    export class Sandbox {

        private core: Core;

        constructor(core: Core) {
            this.core = core;
        }


        public dom() {
            return core.dom();
        }

        publish(message, args) {
            this.core.publish(message, args);
        }

        subscribe(message, callback) {
            this.core.subscribe(message, callback);
        }

    }
}
