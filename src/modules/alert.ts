/// <reference path="../sandbox.ts" />
/// <reference path="../../typings/requirejs/require.d.ts" />
/// <reference path="../imodule.ts" />


export class Alert implements IModule {


    private sandbox: any;

    constructor(sandbox) {
        this.sandbox = sandbox;

    }

    public create() {
        this.sandbox.subscribe("alert", () => {
          this.sandbox.alert({message: "Good Job", title: "SCM Architecture"});
        });
    }

    public destroy() {
    }
}



