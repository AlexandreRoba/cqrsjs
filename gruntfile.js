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
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                add: true,
                addFiles: ['.'], // '.' for all files except ingored files in .gitignore
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'], // '-a' for all files
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                npm: true,
                npmTag: 'Release v%VERSION%',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
            }
        },
        changelog: {
            options: {

            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-push-release');
    grunt.loadNpmTasks('grunt-changelog');

    grunt.registerTask('release',['bump']);
    grunt.registerTask('test',['mochaTest']);
    grunt.registerTask('default',['clean:output','typescript','test']);
    grunt.registerTask('travis',['clean:output','typescript','test']);
};