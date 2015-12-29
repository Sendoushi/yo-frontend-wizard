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
 * @param   {array} filesIn
 * @param   {array} filesOut
 * @param   {object} data
 */
module.exports = function (props, srcPath, filesIn, filesOut, data) {
    srcPath = path.join(this.sourceRoot(), srcPath);
    filesOut = filesOut || filesIn;
    data = data || props;

    var template;
    var i;

    for (i = 0; i < filesOut.length; i += 1) {
        template = path.join(srcPath, (filesIn[i] || filesIn[0]));
        this.template(template, filesOut[i], data);
    }
};
