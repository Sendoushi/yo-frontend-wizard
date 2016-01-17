'use strict';

// -----------------------------------------
// VARS

var templateBase = require('../../utils/templateBase.js');
var createFolders = require('../../utils/createFolders.js');
var createAssets = require('../../utils/createAssets.js');

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
        templateBase = templateBase.bind(yo, props, '/common/templates');
        createFolders = createFolders.bind(yo, props);
        createAssets = createAssets.bind(yo, props);

        // Sets dirs
        this._setBuild(props);
        this._setConfig(props);
        this._setSource(props);

        // Templates files in the root
        templateBase([
           '.editorconfig',
           '.gitignore',
           '.jscsrc',
           '.jshintrc',
           'package.json',
           'README.md'
        ]);

        // Specific templating
        !!props.tech.bower && templateBase(['bower.json']);
    },

    // -----------------------------------------
    // PRIVATE FUNCTIONS

    /**
     * Sets build folder
     * @method  _setBuild
     * @private
     */
    _setBuild: function () {
        createFolders(['build', 'test']);
    },

    /**
     * Sets config folder
     * @method  _setConfig
     * @private
     */
    _setConfig: function () {
        templateBase(['config/mapping.js']);
    },

    /**
     * Sets source folder
     * @method  _setSource
     * @param   {object} props
     * @private
     */
    _setSource: function (props) {
        // Create assets
        createAssets(['src/components']);

        // Template and copy files
        templateBase([
            'src/favicon.ico',
            'src/utils/is.js',
            'src/utils/outdatedbrowser.js',
            'src/components/_assets/css/main.scss',
            'src/components/_assets/css/general/form.scss',
            'src/components/_assets/css/general/general.scss',
            'src/components/_assets/css/general/global.scss',
            'src/components/_assets/css/general/icons.scss',
            'src/components/_assets/css/general/type.scss',
            'src/components/_assets/css/general/utils.scss',
            'src/components/_assets/css/vendor/normalize.scss'
        ]);

        // Now the specifics
        if (!!props.tech.sdk) {
            createFolders(['src/sdk/modules']);
            templateBase(['src/sdk/sdk.js']);
        }
    }
};
