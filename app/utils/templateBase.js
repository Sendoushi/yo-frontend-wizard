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
    var newSrcPath = path.join(this.sourceRoot(), srcPath);
    var newFilesOut = filesOut || filesIn;
    var newData = data || props;
    var template;
    var i;

    for (i = 0; i < newFilesOut.length; i += 1) {
        template = path.join(newSrcPath, (filesIn[i] || filesIn[0]));
        this.template(template, newFilesOut[i], newData);
    }
};
