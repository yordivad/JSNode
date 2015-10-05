
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

    publish(message, args) {
        this.core.publish(message, args);
    }

    subscribe(message, callback) {
        this.core.subscribe(message, callback);
    }

}
