/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

let path = require('path');
let glob = require('glob');

/**
 * Get files glob
 * @param  {array} files
 * @return {array}
 */
let getFiles = (files) => {
    // Get all files needed
    let newFiles = files.map(val => {
        let valCwd = val.cwd;
        let ignore = val.ignore;
        let pattern = val.src;
        let dest = val.dest;

        // Get files from pattern
        return glob.sync(pattern, { cwd: valCwd, ignore })
        .map(valGlob => {
            return {
                src: path.join(valCwd, valGlob),
                dest: path.join(dest, valGlob)
            };
        });
    })
    .reduce((val1, val2) => val1.concat(val2));

    return newFiles;
};

// Export
module.exports = {
    getFiles
};
