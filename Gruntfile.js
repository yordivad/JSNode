'use strict';
 
module.exports = function (grunt) {
 
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

 
    // init required configurations for each task.
    grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),

            path: {
                test: "test/steps",
                src: "src"
            },

            bowercopy: {
                options: {
                    clean: true
                },
                test: {
                    options: {
                        destPrefix: 'test/js'
                    },
                    files: {}
                },

            },

            browserify: {
                dist: {
                    files: {
                        'web/main.js': ['src/**/*.js']
                    }
                }
            },

            mocha_istanbul: {

                coverage: {
                    src: 'test', // a folder works nicely
                    options: {
                        mask: '*.config.js'
                    }
                },

                coverageSpecial: {
                    src: ['test/*/*.js'], // specifying file patterns works as well
                    options: {
                        coverageFolder: 'coverageSpecial',
                        mask: '*.config.js',
                        mochaOptions: ['--harmony', '--async-only'], // any extra options
                        istanbulOptions: ['--harmony', '--handle-sigint']
                    }
                },

                coveralls: {
                    src: ['test'], // multiple folders also works
                    options: {
                        coverage: true, // this will make the grunt.event.on('coverage') event listener to be triggered
                        check: {
                            lines: 75,
                            statements: 75
                        },
                        root: './src', // define where the cover task should consider the root of libraries that are covered by tests
                        reportFormats: ['teamcity', 'lcov']
                    }
                }
            },

            istanbul_check_coverage: {
                default: {
                    options: {
                        coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
                        check: {
                            lines: 80,
                            statements: 80
                        }
                    }
                }
            },

            gherkin_report: {
                my_project: {
                    // Target-specific file lists and/or options go here.
                    options: {
                        title: 'My project\'s features',
                        subtitle: 'Generated on ' + (new Date()).toISOString() + ', version: ' + grunt.option('versionNumber') || 'unknown',
                        destination: 'reports/report.html'
                    },
                    files: [{
                        cwd: 'src/test/features',
                        src: ['**/*.feature']
                    }]
                },
            },

            tslint: {
                options: {
                    configuration: grunt.file.readJSON("tslint.json")
                },
                files: {
                    src: ["src/**/*.ts"]
                }
            },

            jslint: {
                all: {
                    src: ["test/**/*.js"],
                    directives: {
                        node: true
                    }
                }
            }
        }
    );
 
    
 
    // Task: Build production version ready for deployment
    grunt.registerTask('build', [
        "browserify",
        "tslint",
        "jslint:all",
        "gherkin_report",
        "mocha_istanbul:coveralls",
        "mocha_istanbul:coverage"

    ]);

    grunt.registerTask('default', ['build']);

};