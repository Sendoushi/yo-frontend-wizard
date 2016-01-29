'use strict';

// -----------------------------------------
// VARS

// var path = require('path');
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
        var newProps = props;

        templateBase = templateBase.bind(yo, newProps, '/redux_riot/templates');
        createFolders = createFolders.bind(yo, newProps);
        createAssets = createAssets.bind(yo, newProps);

        // Set routes
        newProps.routes = this._modifyRoutes(newProps.routes);

        // Sets dirs
        this._setSource(newProps);
        this._setTasks(newProps);
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
        templateBase([
            'tasks/build.js',
            'tasks/server.js',
            'tasks/utils/babel.js'
        ]);
    },

    /**
     * Modifies routes
     * @param  {array} routes
     * @return {array}
     */
    _modifyRoutes: function (routes) {
        var newRoutes = routes;
        var routesParsed = [];
        var i;

        // Parse routes to have all the required data
        function parseRoute(route, base) {
            var newRoute = route;
            var routeUrl = base + newRoute.name;
            var routeCamelcase = string.camelcase(routeUrl);
            var routeConst = string.constRoute(routeUrl);
            var c;

            if (route.name.toLowerCase() === 'index') {
                routeUrl = '/';
            }

            // Set new data
            newRoute.routeUrl = routeUrl;
            newRoute.routeCamelcase = routeCamelcase;
            newRoute.routeConst = routeConst;

            // Flatten the routes
            routesParsed.push(newRoute);

            // Go through all the children
            if (newRoute.children && newRoute.children.length) {
                for (c = 0; c < newRoute.children.length; c += 1) {
                    newRoute.children[c] = parseRoute(newRoute.children[i], routeUrl + '/');
                }
            }

            return route;
        }

        // Go through each route
        for (i = 0; i < newRoutes.length; i += 1) {
            newRoutes[i] = parseRoute(newRoutes[i], '/');
        }

        return routesParsed;
    }
};
