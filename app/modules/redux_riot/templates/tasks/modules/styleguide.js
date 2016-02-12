/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

let path = require('path');
let Promise = require('bluebird');
let spawn = require('child_process').spawn;
let cwd = process.cwd();

let srcPath = path.join(cwd, 'src/_styleguide');
let configPath = path.join(srcPath, '_config.yml');
let buildPath = path.join(cwd, 'build/_sg');

let commandParams;
let command;
let promise;

// Proceed with command
commandParams = ['-s', srcPath, '-d', buildPath, '--config', configPath];
command = spawn('jekyll', ['build'].concat(commandParams));

// Listen for changes
command.stdout.on('data', (data) => {
    /* eslint-disable no-console */
    console.log('' + data);
    /* eslint-enable no-console */
});

// Set the promise
promise = new Promise((resolve, reject) => {
    command.stderr.on('data', (data) => {
        reject(data);

        /* eslint-disable no-console */
        console.error('' + data);
        /* eslint-enable no-console */
    });

    command.on('close', (code) => {
        if (code !== 0) {
            reject();
        } else {
            resolve();
        }
    });
});

// Export
module.exports = promise;
