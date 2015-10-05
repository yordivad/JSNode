'use strict';
 
module.exports = function (grunt) {
 
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

 
    // init required configurations for each task.
    grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),

            bowercopy: {
                libs: {
                    options: {
                        destPrefix: 'src/libs'
                    },
                    files: {
                        'jquery.js': 'jquery/jquery.js',
                        'sweetalert.js': "sweetalert/dist/sweetalert-dev.js"
                    }
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
            },

            copy: {
                options:{
                    punctuation: ''
                },
                main: {
                    files: [
                        {expand: true, cwd: "dist", src: ['**'], dest: 'web/scripts/',filter: 'isFile' },
                        {expand: true, cwd: "src/libs/", src: ['**'], dest: 'web/scripts/libs',filter: 'isFile'},
                        {expand: true, cwd: "standalone", src: ['**'], dest: 'web/scripts/',filter: 'isFile' }
                    ],
                },
            },

            typescript: {
                base: {
                    src: ['src/**/*.ts'],
                    dest: 'dist/',
                    options: {
                        module: 'commonjs', //or commonjs
                        target: 'es5', //or es3
                        basePath: 'src',
                        sourceMap: false,
                        declaration: false
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

        }
    );
 
    
 
    // Task: Build production version ready for deployment
    grunt.registerTask('build', [
        "bowercopy",
        "tslint",
        "jslint:all",
        "typescript",
        "copy",
        "mocha_istanbul:coveralls",
        "mocha_istanbul:coverage"

    ]);

    grunt.registerTask('default', ['build']);

};