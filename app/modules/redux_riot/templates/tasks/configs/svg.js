/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

let path = require('path');
let cwd = process.cwd();
let env = process.argv[2];

let buildPath = path.join(cwd, 'build');

// Export
module.exports = {
    svgmin: {
        target: env === 'prod' ? {
            files: [{
                expand: true,
                cwd: buildPath,
                src: ['**/_assets/**/*.svg'],
                dest: buildPath
            }]
        } : {},
        options: {
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
        }
    }
};
