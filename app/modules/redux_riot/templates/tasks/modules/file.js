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
let srcCompPath = path.join(srcPath, 'components');
let buildPath = path.join(cwd, 'build');
let files = filesUtil.getFiles([
    { cwd: path.join(srcCompPath, '_assets/html'), src: ['index.php'], dest: buildPath },
    { cwd: srcCompPath, src: ['**/_assets/**/*.svg'], dest: path.join(buildPath, 'components/') },
    { cwd: srcCompPath, src: ['**/_assets/**/*.png'], dest: path.join(buildPath, 'components/') },
    { cwd: srcCompPath, src: ['**/_assets/**/*.gif'], dest: path.join(buildPath, 'components/') },
    { cwd: srcCompPath, src: ['**/_assets/**/*.jpg'], dest: path.join(buildPath, 'components/') },
    { cwd: path.join(srcPath, 'modules'), src: ['**/_assets/**/*'], dest: path.join(buildPath, 'modules/') },
    { cwd: path.join(srcCompPath, '_assets/ico'), src: ['*.ico'], dest: buildPath }
].concat(env !== 'prod' ? [] : [{
    cwd: path.join(cwd, 'node_modules/outdated-browser/outdatedbrowser'),
    src: ['lang/en.html'],
    dest: path.join(buildPath, 'outdatedbrowser')
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
