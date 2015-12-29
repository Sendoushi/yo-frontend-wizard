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
        this._setTasks(props);

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
        createFolders(['build']);
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
            'src/bootstrap.js',
            'src/favicon.ico',
            'src/utils/is.js',
            'src/structure/css/main.scss',
            'src/components/css/main.scss',
            'src/components/css/general/form.scss',
            'src/components/css/general/general.scss',
            'src/components/css/general/global.scss',
            'src/components/css/general/icons.scss',
            'src/components/css/general/type.scss',
            'src/components/css/general/utils.scss',
            'src/components/css/vendor/normalize.scss'
        ]);

        // Now the specifics
        if (!!props.tech.sdk) {
            createFolders(['src/sdk/modules']);
            templateBase(['src/sdk/sdk.js']);
        }
    },

    /**
     * Sets tasks folder
     * @method  _setTasks
     * @private
     */
    _setTasks: function () {
        templateBase([
            'tasks/build.js',
            'tasks/server.js'
        ]);
    }
}
