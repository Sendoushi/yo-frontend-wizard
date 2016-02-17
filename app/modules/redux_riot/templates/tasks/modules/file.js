/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

let fs = require('fs-extra');
let path = require('path');
let Promise = require('bluebird');
let cwd = process.cwd();
let env = process.argv[2];
let filesUtil = require(path.join(cwd, 'tasks/utils/files.js'));
let ensureFilePromise = Promise.promisify(fs.ensureFile);
let copyPromise = Promise.promisify(fs.copy);

let srcPath = path.join(cwd, 'src');
let buildPath = path.join(cwd, 'build');

let files = filesUtil.getFiles([
    {
        cwd: srcPath,
        src: '**/_assets/**/*.*',
        ignore: ['**/*.scss', '**/*.css', '**/*.php', '**/*.html', '**/*.ico'],
        dest: buildPath
    }, {
        cwd: path.join(srcPath, 'containers/_assets/html'),
        src: 'index.php',
        dest: buildPath
    }, {
        cwd: srcPath,
        src: 'favicon.ico',
        dest: buildPath
    }
].concat(env !== 'prod' ? [] : [{
    cwd: path.join(cwd, 'node_modules/outdated-browser'),
    src: 'outdatedbrowser/lang/en.html',
    dest: buildPath
}]));

// Export
module.exports = () => {
    let promises = [];

    // Set the promises
    files.forEach(val => {
        let promise;

        // Copy the files
        promise = ensureFilePromise(val.dest)
        .then(copyPromise.bind(null, val.src, val.dest));

        // Add the promise to be set
        promises.push(promise);
    });

    return Promise.all(promises);
};
