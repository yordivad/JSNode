
$(document).ready(function () {
    require("./libs/sweetalert");
    var App = require("./init/alertapp").AlertApp;

    setTimeout(function () {
        (new App()).initialize();
    }, 500);
});