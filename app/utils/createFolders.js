'use strict';

// -----------------------------------------
// VARS

// -----------------------------------------
// EXPORT

/**
 * Creates folders in the base
 * @param   {object} props
 * @param   {array} folders
 */
module.exports = function (props, folders) {
    for (var i = 0; i < folders.length; i += 1) {
        this.mkdir(folders[i]);
    }
};
