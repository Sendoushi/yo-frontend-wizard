/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

let path = require('path');
let cwd = process.cwd();
let env = process.argv[2];

let srcPath = path.join(cwd, 'src');
let srcCompPath = path.join(srcPath, 'components');
let buildPath = path.join(cwd, 'build');

let copyConfig;
let files;

// Set the copy options
files = [
    { expand: true, cwd: path.join(srcCompPath, '_assets/html'), src: ['index.php'], dest: buildPath },
    { expand: true, cwd: srcCompPath, src: ['**/_assets/**/*.svg'], dest: path.join(buildPath, 'components/') },
    { expand: true, cwd: srcCompPath, src: ['**/_assets/**/*.png'], dest: path.join(buildPath, 'components/') },
    { expand: true, cwd: srcCompPath, src: ['**/_assets/**/*.gif'], dest: path.join(buildPath, 'components/') },
    { expand: true, cwd: srcCompPath, src: ['**/_assets/**/*.jpg'], dest: path.join(buildPath, 'components/') },
    { expand: true, cwd: path.join(srcPath, 'modules'), src: ['**/_assets/**/*'], dest: path.join(buildPath, 'modules/') },
    { expand: true, cwd: path.join(srcCompPath, '_assets/ico'), src: ['*.ico'], dest: buildPath }
].concat(env !== 'prod' ? [] : [{
    expand: true,
    cwd: path.join(cwd, 'node_modules/outdated-browser/outdatedbrowser'),
    src: ['lang/en.html'],
    dest: path.join(buildPath, 'outdatedbrowser')
}]);

copyConfig = {
    target: { files }
};

// Export
module.exports = { copy: copyConfig };
