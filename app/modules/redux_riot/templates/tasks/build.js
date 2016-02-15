/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

/* eslint-disable no-var */
var path = require('path');
var cwd = process.cwd();
var tasksPath = path.join(cwd, 'tasks');
var modulesPath = path.join(tasksPath, 'modules');
var buildPath = path.join(cwd, 'build');
var env = process.argv[2];

var Promise = require('bluebird');
var gruntRun = require(path.join(modulesPath, 'grunt.js'));
var rm = require('rimraf');
var rmPromise = Promise.promisify(rm);

var bundlerFn;
var logTask;
var cssFn;

require(path.join(tasksPath, 'utils/babel.js')); // Setup babel

/**
 * Log the task
 * @param  {string} task
 */
logTask = (task) => {
    var taskCmLine = `\n########################\n`;
    var taskLine = `# ${task}`;

    /* eslint-disable no-console */
    console.log(taskCmLine + taskLine + taskCmLine);
    /* eslint-enable no-console */
};

/**
 * Css env function
 * @return {promise}
 */
cssFn = () => {
    logTask('Run css tasks');

    // Run grunt tasks
    return gruntRun('css');
};

/**
 * Bundler env function
 * @return {promise}
 */
bundlerFn = () => {
    logTask('Run bundler tasks');

    // Remove old files
    return rmPromise(path.join(buildPath, '*'))
    // Run bundler task
    .then(() => {
        let bundlerPath = path.join(modulesPath, 'bundler.js');
        let promise = require(bundlerPath);

        return promise();
    })
    // Run grunt tasks
    .then(gruntRun(env === 'prod' ? 'build-prod' : 'build'));
};

/**
* Take care of running the task
*/
(new Promise((resolve) => {
    // Set the initial promise
    resolve();
}))
// Set the tasks per env
.then(() => {
    var fn = bundlerFn;
    fn = env === 'css' && cssFn || fn;

    return fn();
})
// Clean temporaries
.then(() => {
    logTask('Clean temporaries');

    // Remove temporaries
    return rmPromise(path.join(buildPath, '*.scss'));
})
// Force to exit the process
.then(process.exit);
/* eslint-enable strict, no-var */
