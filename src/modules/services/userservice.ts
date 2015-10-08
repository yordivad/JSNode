/// <reference path="../../_all.ts" />

namespace Aurea {

    export class UserService {

        public get() {
            return null;
        }

        public put(users: User[]) {
            console.log(users.length);
        }

        public push(user: User) {
            console.log(user.name);
        }

    }
}
