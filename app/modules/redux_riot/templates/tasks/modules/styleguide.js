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

// Export
module.exports = () => {
    // Set the promise
    let promise = new Promise((resolve, reject) => {
        let commandParams;
        let command;

        // Proceed with command
        commandParams = ['-s', srcPath, '-d', buildPath, '--config', configPath];
        command = spawn('jekyll', ['build'].concat(commandParams));

        // Listen for changes
        command.stdout.on('data', (data) => {
            /* eslint-disable no-console */
            console.log('' + data);
            /* eslint-enable no-console */
        });

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

    return promise;
};
