/*jshint node:true, es3:false, latedef:false*/
module.exports = function (grunt) {
    'use strict';

    var path = require('path');

    // Load all grunt tasks in node_modules
    grunt.file.expand('../node_modules/grunt-*/tasks').forEach(grunt.loadTasks);

    // The config
    grunt.initConfig({
        php: {
            dist: {
                options: {
                    port: 8000,
                    hostname: '0.0.0.0',
                    keepalive: true,
                    base: path.resolve(path.join('../', 'build'))
                }
            }
        }
    });

    grunt.registerTask('server', ['php']);
};
