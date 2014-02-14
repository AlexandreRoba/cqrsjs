module.exports = function(grunt){
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean:{
            output:["lib/**/*.js",'lib/**/*.map']
        },
        jshint:{
            //define the file to lint
            files:["lib/**/*.js","test/**/*.js","gruntfile.js"],
            options:{
                globals:{


                }
            }

        },
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'lib',
                options: {
                    module: 'commonjs', //or amd commonjs
                    target: 'es5', //or es3
                    base_path: 'src/',
                    sourcemap: false,
                    declaration: false,
                    comments: true
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['lib/test/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test',['mochaTest']);
    grunt.registerTask('default',['clean:output','typescript','jshint']);
    grunt.registerTask('travis',['clean:output','typescript','jshint']);
};