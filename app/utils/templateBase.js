'use strict';

// -----------------------------------------
// VARS

var path = require('path');

// -----------------------------------------
// EXPORT

/**
 * Creates folders in the base
 * @param   {object} props
 * @param   {string} srcPath
 * @param   {array} files
 */
module.exports = function (props, srcPath, files) {
    srcPath = path.join(this.sourceRoot(), srcPath);

    for (var i = 0; i < files.length; i += 1) {
        this.template(path.join(srcPath, files[i]), files[i], props);
    }
};
