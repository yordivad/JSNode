var jsdom = require('jsdom').jsdom;
global.document = jsdom('<html><head><script></script></head><body></body></html>');
global.window = global.document.parentWindow;
var window = global.window;
//global.navigator = window.navigator;

window = function() {
    "use strict";
    return {
        angular : {},
        location: function() {
            return {
                href : ""
            }
        }
    }
}

