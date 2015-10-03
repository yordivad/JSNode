
/*globals featureFile, scenarios, steps */

module.exports = (function () {

    "use strict";

    var Yadda = require('yadda');

    Yadda.plugins.mocha.StepLevelPlugin.init();

    function require_library(libraries, library) {
        return libraries.concat(require('../test/features/step_definitions/' + library + '-steps.js'));
    }

    function require_feature_libraries(feature) {
        return [feature.title].reduce(require_library, []);
    }

    new Yadda.FeatureFileSearch('./test/features').each(function (file) {

        featureFile(file, function (feature) {

            var libraries = require_feature_libraries(feature),
                yadda = Yadda.createInstance(libraries, {scenary: {}});

            scenarios(feature.scenarios, function (scenario) {
                steps(scenario.steps, function (step, done) {
                    yadda.run(step, done);
                });
            });

        });

    });

}());