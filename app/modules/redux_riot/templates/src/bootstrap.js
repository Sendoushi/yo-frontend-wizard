(function () {
    'use strict';

    // -----------------------------------------
    // VARS

    let is = require('./utils/is.js');

    let riot = require('riot');
    require('./structure/app.js');

    // -----------------------------------------
    // PUBLIC FUNCTIONS

    /**
     * Initialize the app
     */
    let init = () => {
        // TODO: Set mobile
        // TODO: Set ie
        // TODO: Remove class no-script

        let app = riot.mount('app');

        // Router
        <%
        function parseRoute(route, base) {
            var routeUrl = base + route.name;

        %>riot.route('<%= routeUrl %>/*', () => {
            // TODO: Set route
        });

        <%

            if (route.children && route.children.length) {
                for (var i = 0; i < route.children.length; i += 1) {
                    parseRoute(route.children[i], routeUrl);
                }
            }
        }

        for (var i = 0; i < routes.length; i += 1) {
            parseRoute(routes[i], '/');
} %>riot.route.start(true);
    };

    // -----------------------------------------
    // PRIVATE FUNCTIONS

    // -----------------------------------------

    init();
})();
