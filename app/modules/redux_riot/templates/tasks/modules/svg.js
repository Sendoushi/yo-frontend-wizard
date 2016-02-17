/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

let fs = require('fs');
let path = require('path');
let Promise = require('bluebird');
let SVGO = require('svgo');

let cwd = process.cwd();
let env = process.argv[2];
let filesUtil = require(path.join(cwd, 'tasks/utils/files.js'));

let buildPath = path.join(cwd, 'build');
let svgFiles = env === 'prod' ? filesUtil.getFiles([
    {
        cwd: buildPath,
        src: '**/_assets/**/*.svg',
        dest: buildPath
    }
]) : [];
let svgo = new SVGO({
    plugins: [
        { removeViewBox: true },
        { removeUselessStrokeAndFill: true },
        { removeEmptyAttrs: true },
        { collapseGroups: true },
        { minifyStyles: true },
        { removeMetadata: true },
        { removeTitle: true },
        { removeUnkownsAndDefaults: true },
        { removeUselessDefs: true },
        { removeUselessStrokeAndFill: true }
    ]
});

// Export
module.exports = () => {
    // Take care of sass and css
    let promises;

    // TODO: Don't know if it is working

    // Set the promises for each file
    promises = svgFiles.map(val => {
        // Render sass
        return (new Promise((resolve, reject) => {
            // Read the file
            fs.readFile(val.src, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }))
        .then(data => {
            return (new Promise((resolve, reject) => {
                svgo.optimize(data, (result) => {
                    if (result.error) {
                        reject(result.error);
                    } else {
                        resolve(result.data);
                    }
                });
            }));
        })
        .then(data => {
            // Write the file
            fs.writeFileSync(val.dest, data);
        });
    });

    return Promise.all(promises);
};
