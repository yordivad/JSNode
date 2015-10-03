
var path = require('path');
var Yadda = require('yadda');

Yadda.plugins.mocha.StepLevelPlugin.init();

new Yadda.FeatureFileSearch('./test/features').each(function(file) {
    featureFile(file, function(feature) {


        var libraries = require_feature_libraries(feature);
      //  var library = require('../test/steps/core-steps.js');

        var yadda = Yadda.createInstance(libraries, {scenary: {}});

        scenarios(feature.scenarios, function(scenario) {
            steps(scenario.steps, function(step, done) {
                yadda.run(step,done);
            });
        });

    });

});

function require_feature_libraries(feature) {
    if(typeof  feature.annotations.libraries != "undefined") {
        return feature.annotations.libraries.split(', ').reduce(require_library, []);
    }
    return [feature.title].reduce(require_library, []);
}

function require_library(libraries, library) {
    return libraries.concat(require('../test/features/step_definitions/' + library + '-steps.js'));
}
