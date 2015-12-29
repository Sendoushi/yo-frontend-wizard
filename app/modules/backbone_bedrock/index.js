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
        templateBase = templateBase.bind(yo, props, '/backbone_bedrock/templates');
        createFolders = createFolders.bind(yo, props);
        createAssets = createAssets.bind(yo, props);

        // Sets dirs
        this._setConfig(props);
        this._setSource(props);
        this._setTasks(props);

        // Set routes
        this._setRoutes({
            name: props.name,
            minie: props.minie,
            structure: props.structure,
            tech: props.tech,
            routes: [{
                name: 'app',
                nameCamelcase: 'App',
                nameAllCamelcase: 'App',
                children: props.routes,
                htmlContent: '<div class="content"></div>'
            }]
        }, 'src/structure');
    },

    // -----------------------------------------
    // PRIVATE FUNCTIONS

    /**
     * Sets config folder
     * @method  _setConfig
     * @private
     */
    _setConfig: function () {
        templateBase(['config/states.js']);
    },

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
            'src/structure/index.html'
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

        var templateView = 'src/structure/view.js';
        var templateController = 'src/structure/controller.js';
        var templateHtml = 'src/structure/structure.html';
        var assetsArr = [];
        var routePath;
        var route;
        var i;

        // Go through each route
        for (i = 0; i < routes.length; i += 1) {
            route = routes[i];
            routePath = path.join(base, route.nameAllCamelcase);

            // Set for assets
            assetsArr.push(routePath);

            // Create the file templated
            templateBase([templateController, templateView, templateHtml], [
                path.join(routePath, route.nameAllCamelcase + 'Controller.js'),
                path.join(routePath, route.nameAllCamelcase + 'View.js'),
                path.join(routePath, '_assets/html', route.name + '.html')
            ], {
                name: props.name,
                routeName: route.name,
                routeNameCamelcase: route.nameCamelcase,
                routeNameAllCamelcase: route.nameAllCamelcase,
                routeChildren: route.children,
                htmlContent: route.htmlContent || ''
            });

            if (route.children && route.children.length) {
                this._setRoutes(route.children, routePath);
            }
        }

        // Now create assets
        createAssets(assetsArr);
    }
}
