module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint:{
            //define the file to lint
            files:["lib/**/ *.js","test/**/*.js","gruntfile.js"],
            options:{
                globals:{

                }
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default',['jshint']);
    grunt.registerTask('travis',['jshint']);
};