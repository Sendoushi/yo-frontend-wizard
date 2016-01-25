'use strict';

// -----------------------------------------
// VARS

var path = require('path');
var string = require('../../utils/string.js');
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

        // Set routes
        props.routes = this._modifyRoutes(props.routes);

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
            'src/components/_assets/html/index.html',
            'src/modules/app/store.js',
            'src/modules/app/actions.js',
            'src/modules/utils/baseRoute.js',
            'src/modules/utils/baseStore.js',
            'src/modules/utils/baseActions.js',
            'src/components/utils/baseComponent.js',
            'src/components/app.js'
        ]);

        // Set app modules
        templateBase([
            'src/modules/route/router.js',
            'src/modules/route/modules/root.js'
        ], [
            'src/modules/route/router.js',
            'src/modules/route/modules/root.js'
        ], {
            name: props.name,
            routes: props.routes,
            routeName: 'app',
            routeNameCamelcase: 'app',
            routeNameAllCamelcase: 'App',
            htmlContent: ''
        });
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
     * Modifies routes
     * @param  {array} routes
     * @return {array}
     */
    _modifyRoutes: function (routes) {
        var routesParsed = [];

        // Parse routes to have all the required data
        function parseRoute(route, base) {
            var routeUrl = base + route.name;
            var routeCamelcase = string.camelcase(routeUrl);
            var routeConst = string.constRoute(routeUrl);

            if (route.name.toLowerCase() === 'index') {
                routeUrl = '/';
            }

            // Set new data
            route.routeUrl = routeUrl;
            route.routeCamelcase = routeCamelcase;
            route.routeConst = routeConst;

            // Flatten the routes
            routesParsed.push(route);

            // Go through all the children
            if (route.children && route.children.length) {
                for (var i = 0; i < route.children.length; i += 1) {
                    route.children[i] = parseRoute(route.children[i], routeUrl + '/');
                }
            }

            return route;
        }

        // Go through each route
        for (var i = 0; i < routes.length; i += 1) {
            routes[i] = parseRoute(routes[i], '/');
        }

        return routesParsed;
    }
};
