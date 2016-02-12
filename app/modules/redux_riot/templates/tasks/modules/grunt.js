/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

let path = require('path');
let Promise = require('bluebird');
let grunt = require('grunt');
let deepMixIn = require('mout/object/deepMixIn.js');
let cwd = process.cwd();

let configFiles;
let configObj;
let run;

// Load all grunt tasks in node_modules
grunt.file.expand(path.join(cwd, 'node_modules/grunt-*/tasks')).forEach(grunt.loadTasks);

// Hack to avoid loading a Gruntfile
grunt.task.init = () => {};

// Require the config file
configFiles = ['script.js', 'style.js', 'file.js', 'svg.js'];
configFiles = configFiles.map(val => {
    let filePath = path.join(cwd, 'tasks/configs/' + val);
    configObj = deepMixIn({}, configObj, require(filePath));
});

// Initialize grunt
grunt.initConfig(configObj);

// The tasks...
grunt.registerTask('css', ['sass_globbing', 'sass', 'copy']);
grunt.registerTask('build', ['css']);
grunt.registerTask('build-prod', ['build', 'svgmin', 'autoprefixer', 'pixrem', 'cssmin', 'uglify']);

/**
 * Run task under promise
 * @param  {string} task
 * @return {promise}
 */
run = (task) => {
    let promise;

    // Set the grunt promise
    promise = new Promise((resolve, reject) => {
        // Run the real list of tasks
        grunt.tasks([task], {}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

    return promise;
};

// Export
module.exports = run;
