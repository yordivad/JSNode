var location = null;

module.exports = (function () {
    return {
        init: function () {
            var jsdom = require('jsdom').jsdom;
            global.document = jsdom('<html><head><script></script></head><body></body></html>');
            global.window = global.document.parentWindow;
            var window = global.document.defaultView;
            global.navigator = window.navigator;
            location = jsdom().nodeLocation;
        }
    }
}());