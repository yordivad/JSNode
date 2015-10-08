/// <reference path="../../_all.ts" />

namespace Aurea {

    export interface IUserScope extends ng.IScope {
        users: User[];
        newUser: string;
        editedUser: User;
        remainingCount: number;
        doneCount: number;
        allChecked: boolean;
        statusFilter: { completed: boolean; };
        location: ng.ILocationService;
        vm: UserController;
    }
}


