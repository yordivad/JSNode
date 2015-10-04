/// <reference path="../sandbox.ts" />
/// <reference path="../imodule.ts" />

export class FirstLoad implements IModule {

    private sandbox: any;

    constructor(sandbox: any) {
        this.sandbox = sandbox;
    }

    public create() {
        this.sandbox.publish("alert", "some text");
    }

    public  destroy() {

    }

}

