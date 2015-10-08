'use strict';

module.exports = function (grunt) {
 
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.registerMultiTask('exportmodules', 'append export namespace to generate js files for testeabity', function() {

        var self = this;
        grunt.file.expand(self.data.src).forEach(function(filepath) {
            filepath = filepath.replace(".ts",".js");
          var content = grunt.file.read(filepath);
            if(!content.includes(self.data.export)) {
                content += " " + self.data.export;
                grunt.file.write(filepath, content);
            }
        });

    });

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
                        'sweetalert.js': "sweetalert/dist/sweetalert-dev.js",
                        'angular.js':"angular/angular.js"
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
                    src: ["test/features/**/*.js"],
                    directives: {
                        node: true
                    }
                }
            },

            exportmodules : {
               main : {
                   src: ["src/**/*.ts"],
                   export: "if (typeof exports !== 'undefined') { exports.Aurea = Aurea; }"
               }
            },

            copy: {
                options:{
                    punctuation: ''
                },
                main: {
                    files: [
                        {expand: true, cwd: "src/libs/", src: ['**'], dest: 'obj/libs',filter: 'isFile'}
                    ],
                },
                debug: {
                    files: [
                        {expand: true, cwd: "dist", src: ['libs.js','source.js'], dest: 'web/debug/scripts',filter: 'isFile'},
                        {expand: true, cwd: "web", src: ['index.html'], dest: 'web/debug',filter: 'isFile'}
                    ],
                },
                prod: {
                    files: [
                        {expand: true, cwd: "dist", src: ['libs.min.js','source.min.js'], dest: 'web/prod/scripts',filter: 'isFile'},
                        {expand: true, cwd: "web", src: ['index.html'], dest: 'web/prod',filter: 'isFile'}
                    ],
                }
            },

            concat: {
                dist: {
                    src: ['obj/core.js', 'obj/sandbox.js','obj/app.js',  'obj/init/**/*.js','obj/modules/**/*.js'],
                    dest: 'dist/source.js'
                },
                libs: {
                    src:['obj/libs/*.*' ],
                    dest:'dist/libs.js'
                }
            },

            typescript: {
                local: {
                    src: ['src/**/*.ts'],
                    options: {
                        module: 'commonjs', //or commonjs
                        target: 'es5', //or es3
                        sourceMap: false,
                        declaration: false
                    }
                },
                base: {
                    src: ['src/**/*.ts'],
                    dest: 'obj/',
                    options: {
                        module: 'commonjs', //or commonjs
                        target: 'es5', //or es3
                        sourceMap: false,
                        declaration: false
                    }
                }
            },

            mocha_istanbul: {

                coverage: {
                    src: 'test/features', // a folder works nicely
                    options: {
                        mask: '*.config.js'
                    }
                },

                coverageSpecial: {
                    src: ['test/features/**/*.js'], // specifying file patterns works as well
                    options: {
                        coverageFolder: 'coverageSpecial',
                        mask: '*.config.js',
                        mochaOptions: ['--harmony', '--async-only'], // any extra options
                        istanbulOptions: ['--harmony', '--handle-sigint']
                    }
                },

                coveralls: {
                    src: ['test/features'], // multiple folders also works
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

            watch: {
                scripts: {
                    files: ['src/**/*.ts',"test/features/**/*.js"],
                    tasks: [
                        "tslint",
                        "jslint:all",
                        "typescript:local",
                        "exportmodules",
                        "mocha_istanbul:coveralls",
                        "mocha_istanbul:coverage"
                    ],
                    options: {
                        spawn: false,
                    },
                },
            },

            uglify: {
                prod: {
                    files: {
                        'dist/libs.min.js': ['dist/libs.js'],
                        'dist/source.min.js': ['dist/source.js']
                    }
                }
            },

            injector: {
                options: {
                    transform:function(filepath, index,length) {
                        if(filepath.includes(".css"))
                            return "<link rel='stylesheet' href='/Aurea" + filepath + "'>"

                        if(filepath.includes(".html"))
                            return "<link rel='import' href='/Aurea"  + filepath + "'>";

                        if(filepath.includes(".js"))
                            return "<script src='/Aurea" + filepath + "'></script>";
                    }
                },
                local_dependencies: {
                    files: {
                        'web/debug/index.html': ['web/debug/**/*.js', 'web/debug/**/*.css'],
                        'web/prod/index.html': ['web/prod/**/*.js', 'web/prod/**/*.css'],
                    }
                }
            }

        }
    );


    grunt.registerTask('build', [
        "tslint",
        "jslint:all"
    ]);

    grunt.registerTask('deploy', [
        "typescript:base",
        "bowercopy",
        "copy:main",
        "concat",
        "uglify",
        "copy:debug",
        "copy:prod",
        "injector"
    ]);

    grunt.registerTask('test', [
        "typescript:local",
        "exportmodules",
        "mocha_istanbul:coveralls",
        "mocha_istanbul:coverage"
    ]);

    grunt.registerTask('default', ['build', 'test', 'deploy','watch']);

};

