/// <reference path="../../_all.ts" />


namespace Aurea {
    export class UserController {

        public  static $inject = [
            "$scope",
            "$location",
            "userstorage",
            "filterFilter"
        ];

        private users:  Aurea.User[];

        constructor(
            private $scope: Aurea.IUserScope,
            private $location: ng.ILocationService,
            private service : Aurea.UserService,
            private filterFilter: any
        ) {
            this.users = service.get();
            $scope.newUser = "";
            $scope.editedUser = null;
            $scope.vm = this;

            $scope.$watch("users", () => this.onUsers(), true);
            $scope.$watch("location.path()", path => this.onPath(path));

            if ($location.path() === "") {
                $location.path("/");
            }
            $scope.location = $location;
        }

        onPath(path: any) {
            this.$scope.statusFilter = (path === "/active") ?
            { completed: false } : (path === "/completed") ?
            { completed: true } : null;
        }

        onUsers() {
            this.$scope.remainingCount = this.filterFilter(this.users, { completed: false }).length;
            this.$scope.doneCount = this.users.length - this.$scope.remainingCount;
            this.$scope.allChecked = !this.$scope.remainingCount;
            this.service.put(this.users);
        }

        addUser() {
            var name : string = this.$scope.newUser.trim();
            if (!name.length) {
                return;
            }
            this.users.push(new User(name, "", null));
            this.$scope.newUser  = "";
        }

        editUser(user: Aurea.User) {
            this.$scope.editedUser = user;
        }


        doneEditing(user: User) {
            this.$scope.editedUser = null;

        }

        removeUser(user: User) {
            this.users.splice(this.users.indexOf(user), 1);
        }
    }
}
