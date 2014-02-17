module.exports = function(grunt){
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean:{
            output:["lib/**/*.js",'lib/**/*.map']
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

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test',['mochaTest']);
    grunt.registerTask('default',['clean:output','typescript','test']);
    grunt.registerTask('travis',['clean:output','typescript']);
};