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
        templateBase = templateBase.bind(yo, props, '/slim_twig/templates');
        createFolders = createFolders.bind(yo, props);
        createAssets = createAssets.bind(yo, props);

        // Sets dirs
        this._setSource(props);
        this._setTasks(props);

        // Templates files in the root
        templateBase(['composer.json']);

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
            'src/modules/index.php',
            'src/components/base.html.twig',
            'src/components/boilerplate_footer.html.twig',
            'src/components/boilerplate_header.html.twig',
            'src/components/footer.html.twig',
            'src/components/header.html.twig'
        ]);
    },

    /**
     * Sets tasks folder
     * @method  _setTasks
     * @private
     */
    _setTasks: function () {
        templateBase(['tasks/build.js']);
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

        var templateTwig = 'src/modules/structure.html.twig';
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
            templateBase([templateTwig], [
                path.join(routePath, route.name + '.html.twig')
            ], {
                name: props.name,
                routeName: route.name,
                routePath: routePath.replace('src/', '')
            });

            if (route.children && route.children.length) {
                this._setRoutes(route.children, routePath);
            }
        }

        // Now create assets
        createAssets(assetsArr);
    }
};
