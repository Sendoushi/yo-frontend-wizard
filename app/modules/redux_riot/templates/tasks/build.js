/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

/* eslint-disable no-var */
var fs = require('fs-extra');
var path = require('path');
var Promise = require('bluebird');
var cwd = process.cwd();
var tasksPath = path.join(cwd, 'tasks');
var modulesPath = path.join(tasksPath, 'modules');
var buildPath = path.join(cwd, 'build');
var env = process.argv[2];
var rmPromise = Promise.promisify(fs.remove);

var newPromise;
var bundlerFn;
var logTask;
var fileFn;
var cssFn;
/* eslint-enable no-var */

// Setup babel
require(path.join(tasksPath, 'utils/babel.js'));

/**
 * Log the task
 * @param  {string} task
 */
logTask = (task) => {
    let taskCmLine = '';

    // Lets create the comment line
    while (taskCmLine.length < 60) {
        taskCmLine += '#';
    }

    /* eslint-disable no-console */
    console.log(`\n${taskCmLine}\n# ${task} \n${taskCmLine}\n`);
    /* eslint-enable no-console */
};

/**
 * Sets a new promise
 * @return {promise}
 */
newPromise = () => (new Promise((resolve) => resolve()));

/**
 * File function
 * @return {promise}
 */
fileFn = () => {
    return newPromise()
    // Run file task
    .then(logTask.bind(null, 'Run file tasks'))
    .then(require(path.join(modulesPath, 'file.js')))
    // Run svg task
    .then(logTask.bind(null, 'Run svg tasks'))
    .then(require(path.join(modulesPath, 'svg.js')));
};

/**
 * Css env function
 * @return {promise}
 */
cssFn = () => {
    return newPromise()
    // Remove old files
    .then(logTask.bind(null, 'Remove old style files'))
    .then(() => rmPromise(path.join(buildPath, '*.css')))
    // Run style task
    .then(logTask.bind(null, 'Run style tasks'))
    .then(require(path.join(modulesPath, 'style.js')));
};

/**
 * Bundler env function
 * @return {promise}
 */
bundlerFn = () => {
    return newPromise()
    // Remove old files
    .then(logTask.bind(null, 'Remove old bundler files'))
    .then(() => rmPromise(path.join(buildPath, '*')))
    // Run bundler task
    .then(logTask.bind(null, 'Run bundler tasks'))
    .then(require(path.join(modulesPath, 'bundler.js')))
    // Run style task
    .then(cssFn);
};

/**
* Take care of running the task
*/
newPromise()
// Set the tasks per env
.then(env === 'css' ? cssFn : bundlerFn)
// Take care of files
.then(env !== 'css' ? fileFn : () => {})
// Force to exit the process
.then(process.exit);
