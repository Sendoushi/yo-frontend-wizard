'use strict';

import { addView, removeView } from 'baseActions.js';
import store from './store.js';

// -----------------------------------------
// VARS

const ROUTES = {
    <%
    function parseRoute(route, base) {
        var routeUrl = base + route.name;

    %>'<%= routeUrl %>/*': () => store.dispatchAction({ type: '<%= route.name %>' }),

    <%

        if (route.children && route.children.length) {
            for (var i = 0; i < route.children.length; i += 1) {
                parseRoute(route.children[i], routeUrl);
            }
        }
    }

    for (var i = 0; i < routes.length; i += 1) {
        parseRoute(routes[i], '/');
} %>};

// -----------------------------------------
// FUNCTIONS

/**
 * Set route
 */
var setRoute = (route) => {
    // The dispatch of init will set the routes
    store.dispatchAction({ type: 'SET_ROUTE', route });
};

/**
 * Init routing
 */
var init = () => {
    // The dispatch of init will set the routes
    store.dispatchAction({ type: 'INIT', routes: ROUTES });
};

// -----------------------------------------
// EXPORT

export default {
    addView: addView.bind(null, store),
    removeView: removeView.bind(null, store),

    init, setRoute
};
