/// <reference path="../sandbox.ts" />
/// <reference path="../../typings/requirejs/require.d.ts" />
/// <reference path="../imodule.ts" />


export class Alert implements IModule {

    private handler: any;


    private sandbox: any;

    constructor(sandbox) {
        this.sandbox = sandbox;
        this.handler = require("./libs/sweetalert");
    }

    public create() {
        this.sandbox.subscribe("alert", () => {
            this.handler("Good job!", "You clicked the button!", "success");
        });
    }

    public destroy() {
    }
}



