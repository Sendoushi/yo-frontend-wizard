/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

let path = require('path');
let cwd = process.cwd();

let srcFile = path.join(cwd, 'build', 'app.js');
let prodFiles = {};
let webpackConfig;

// Set prod file
prodFiles[srcFile] = srcFile;

// Export
module.exports = {
    webpack: webpackConfig,
    uglify: {
        target: {
            files: prodFiles
        },
        mangle: {
            except: []
        }
    }
};
