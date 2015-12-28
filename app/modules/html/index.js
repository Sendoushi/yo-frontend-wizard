'use strict';

// -----------------------------------------
// VARS

var templateBase = require('../../utils/templateBase.js');
var createFolders = require('../../utils/createFolders.js');

// -----------------------------------------
// EXPORT

module.exports = {
    // -----------------------------------------
    // PUBLIC FUNCTIONS

    /**
     * Initialize module
     * @method init
     * @param  {object} yo
     * @param  {object} props
     */
    init: function (yo, props) {
        templateBase = templateBase.bind(yo, props, '/html/templates');
        createFolders = createFolders.bind(yo, props);

        // Sets dirs
        this._setSource(props);

        // Set routes
        this._setRoutes(props);
    },

    // -----------------------------------------
    // PRIVATE FUNCTIONS

    /**
     * Sets source folder
     * @method  _setSource
     * @param   {object} props
     * @private
     */
    _setSource: function (props) {
        // Template and copy files
        templateBase([
            'src/components/boilerplate_footer.html',
            'src/components/boilerplate_header.html',
            'src/components/footer.html',
            'src/components/header.html',
            'src/_templates_mapping.js'
        ]);
    },

    /**
     * Sets routes
     * @method  _setRoutes
     * @param   {object} props
     * @private
     */
    _setRoutes: function (props) {
        // TODO: ...
    }
}
