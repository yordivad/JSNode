/// <reference path="../sandbox.ts" />
/// <reference path="../../typings/requirejs/require.d.ts" />
/// <reference path="../imodule.ts" />

export class Alert implements IModule {

    private handler: any;

    private sandbox: any;

    constructor(sandbox) {
        this.sandbox = sandbox;
    }

    public create() {
        this.handler = require("../libs/sweetalert");
        this.sandbox.subscribe("alert", () => {
            this.handler.swal("Here's a message!");
        });
    }

    public destroy() {
    }
}



