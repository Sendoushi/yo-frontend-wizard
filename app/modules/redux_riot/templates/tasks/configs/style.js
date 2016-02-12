/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

let path = require('path');
let cwd = process.cwd();
let env = process.argv[2];

let srcPath = path.join(cwd, 'src');
let buildPath = path.join(cwd, 'build');

let sassSrcFiles = [
    { name: 'main', exp: 'app', src: path.join(srcPath, 'components/_assets/css') }
];
let sassGlobbingFiles = {};
let sassFiles = {};
let prodFiles = {};
let srcFile;
let destFile;

// Set sass objects
sassSrcFiles.forEach(file => {
    if (file.skip) {
        return;
    }

    // Set sass globbing
    srcFile = path.join(file.src, `${file.name}.scss`);
    destFile = path.join(buildPath, `${file.name}.scss`);

    if (file.sameDir) {
        destFile = path.join(file.src, 'generated', `${file.name}.scss`);
    }

    sassGlobbingFiles[destFile] = [srcFile];

    // Set sass
    srcFile = destFile;
    destFile = path.join(buildPath, `${file.exp || file.name}.css`);

    if (file.sameDir) {
        destFile = path.join(file.src, 'generated', `${file.exp || file.name}.css`);
    }

    sassFiles[destFile] = [srcFile];

    // Set prod
    prodFiles[destFile] = [destFile];
});

// Export
module.exports = {
    sass_globbing: {
        target: {
            files: sassGlobbingFiles
        }
    },
    sass: {
        target: {
            files: sassFiles
        },
        options: {
            sourceMap: env !== 'prod'
        }
    },
    autoprefixer: {
        target: {
            files: prodFiles
        },
        options: {
            browsers: ['last 2 versions', 11]
        }
    },
    pixrem: {
        target: {
            files: prodFiles
        }
    },
    cssmin: {
        target: {
            files: prodFiles
        }
    }
};
