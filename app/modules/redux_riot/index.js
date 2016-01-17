'use strict';

// -----------------------------------------
// VARS

var path = require('path');
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
        templateBase = templateBase.bind(yo, props, '/redux_riot/templates');
        createFolders = createFolders.bind(yo, props);
        createAssets = createAssets.bind(yo, props);

        // Sets dirs
        this._setSource(props);
        this._setTasks(props);
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
            'src/bootstrap.js',
            'src/components/_assets/html/index.html'
        ]);

        // Set app modules
        templateBase(['src/components/app.js'], ['src/components/app.js'], {
            name: props.name,
            routeName: 'app',
            routeNameCamelcase: 'app',
            routeNameAllCamelcase: 'App',
            htmlContent: ''
        });

        // Create store
        templateBase([
            'src/modules/example/store.js',
            'src/modules/example/actions.js',
            'src/modules/utils/baseStore.js',
            'src/modules/utils/baseActions.js',
            'src/components/utils/baseComponent.js',
            'src/modules/route/actions.js',
            'src/modules/route/store.js'
        ], [
            'src/modules/example/store.js',
            'src/modules/example/actions.js',
            'src/modules/utils/baseStore.js',
            'src/modules/utils/baseActions.js',
            'src/components/utils/baseComponent.js',
            'src/modules/route/actions.js',
            'src/modules/route/store.js'
        ]);
    },

    /**
     * Sets tasks folder
     * @method  _setTasks
     * @private
     */
    _setTasks: function () {
        templateBase(['tasks/build.js', 'tasks/server.js']);
    }
};
