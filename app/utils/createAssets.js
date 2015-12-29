'use strict';

// -----------------------------------------
// VARS

// -----------------------------------------
// EXPORT

/**
 * Creates assets folder
 * @param   {object} props
 * @param   {array} routes
 */
module.exports = function (props, routes) {
    var createFolders = require('./createFolders.js').bind(this, props);
    var path;
    var i;

    for (i = 0; i < routes.length; i += 1) {
        path = routes[i] + '/_assets';

        createFolders([
            path,
            path + '/img',
            path + '/svg',
            path + '/css'
        ]);

        if (props.structure === 'backbone_bedrock') {
            createFolders([path + '/html']);
        }
    }
};
