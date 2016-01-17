'use strict';

// -----------------------------------------
// VARS

var templateBase = require('../../utils/templateBase.js');
var createFolders = require('../../utils/createFolders.js');
var createAssets = require('../../utils/createAssets.js');
var path = require('path');

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
        createAssets = createAssets.bind(yo, props);

        // Sets dirs
        this._setSource(props);
        this._setTasks(props);

        // Set routes
        this._setRoutes(props, 'src/modules');
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
        createFolders(['src/scripts']);

        // Template and copy files
        templateBase([
            'src/bootstrap.js',
            'src/components/boilerplate_footer.html',
            'src/components/boilerplate_header.html',
            'src/components/footer.html',
            'src/components/header.html',
            'src/_templates_mapping.js'
        ]);
    },

    /**
     * Sets tasks folder
     * @method  _setTasks
     * @private
     */
    _setTasks: function () {
        templateBase(['tasks/build.js', 'tasks/server.js']);
    },

    /**
     * Sets routes
     * @method  _setRoutes
     * @param   {object} props
     * @param   {string} base
     * @private
     */
    _setRoutes: function (props, base) {
        var routes;

        if (!!props && typeof props === 'object') {
            routes = props.length && props || props.routes;
        }

        routes = routes || [];

        var template = 'src/modules/structure.html';
        var assetsArr = [];
        var routePath;
        var route;
        var i;

        // Go through each route
        for (i = 0; i < routes.length; i += 1) {
            routePath = base;
            route = routes[i];

            // Index / Home should be on root
            if (route.name !== 'index' && route.name !== 'home') {
                routePath = path.join(routePath, route.name);
            }

            // Set for assets
            assetsArr.push(routePath);

            // Create the file templated
            templateBase([template], [path.join(routePath, 'index.html')], {
                name: props.name,
                routeName: route.name
            });

            if (route.children && route.children.length) {
                this._setRoutes(route.children, routePath);
            }
        }

        // Now create assets
        createAssets(assetsArr);
    }
}
