/// <reference path="_all.ts" />


namespace Aurea {
    angular.module("app", [])
        .controller("UserController", Aurea.UserController)
        .directive("UserBlur",  Aurea.UserBlur)
        .directive("UserFocus",  Aurea.UserFocus)
        .service("UserService",  Aurea.UserService);
}

