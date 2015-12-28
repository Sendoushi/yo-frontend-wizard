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
        templateBase = templateBase.bind(yo, props, '/common/templates');
        createFolders = createFolders.bind(yo, props);

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
        templateBase(['build/.gitkeep']);
    },

    /**
     * Sets config folder
     * @method  _setConfig
     * @private
     */
    _setConfig: function () {
        createFolders(['config']);
        templateBase(['config/mapping.js']);
    },

    /**
     * Sets source folder
     * @method  _setSource
     * @param   {object} props
     * @private
     */
    _setSource: function (props) {
        // Create folders
        createFolders([
            'src',
            'src/components',
            'src/structure',
            'src/styles'
        ]);

        // Template and copy files
        templateBase([
            'src/bootstrap.js',
            'src/favicon.ico',
            'src/styles/main.scss',
            'src/structure/.gitkeep',
            'src/components/.gitkeep'
        ]);

        // Now the specifics
        if (!!props.tech.sdk) {
            // Create folders
            createFolders([
                'src/sdk',
                'src/sdk/modules'
            ]);

            // Template and copy files
            templateBase([
                'src/sdk/sdk.js',
                'src/sdk/modules/.gitkeep'
            ]);
        }
    },

    /**
     * Sets tasks folder
     * @method  _setTasks
     * @private
     */
    _setTasks: function () {
        // Create folders
        createFolders(['tasks']);

        // Template and copy files
        templateBase([
            'tasks/build.js',
            'tasks/server.js'
        ]);
    }
}
