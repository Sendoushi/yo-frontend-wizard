'use strict';

import riot from 'riot';
import { initStore } from 'baseStore.js';

// -----------------------------------------
// FUNCTIONS

/**
 * Initialize routing
 * @param  {object} state
 * @param  {object} action
 * @return {object}
 */
let init = (state, action) => {
    let routes = action.routes;
    let routesKeys = Object.keys(routes);
    let i;

    // Now lets set the routes
    for (i = 0; i < routesKeys.length; i += 1) {
        riot.route(routesKeys[i], routes[routesKeys[i]]);
    }

    // Start engines!
    riot.route.base(action.base);
    riot.route.start(true);
};

/**
 * Set the last route
 * @param  {object} state
 * @param  {object} obj
 * @return {object}
 */
let setLast = (state, obj) => {
    let stateInAct = state;

    while (true) {
        if (!!stateInAct.route) {
            stateInAct = stateInAct.route;
        } else {
            stateInAct.route = obj;
            break;
        }
    }

    return state;
};

// -----------------------------------------
// ROUTES FUNCTIONS

<%
    function parseRoute(route, base) {
        var routeUrl = base + route.name;

%>/**
 * <%= route.name %> route handler
 * @param  {object} state
 * @param  {object} action
 * @return {object}
 */
let <%= route.name %> = (state, action) => {
    return setLast({}, { name: '<%= route.name %>' });
};
    <%

        if (route.children && route.children.length) {
            for (var i = 0; i < route.children.length; i += 1) {
                parseRoute(route.children[i], routeUrl);
            }
        }
    }

    for (var i = 0; i < routes.length; i += 1) {
        parseRoute(routes[i], '/');
} %>

// -----------------------------------------
// Initialize store

var store = initStore({}, {
    'INIT': init,
<%
    function parseRoute(route, base) {
        var routeUrl = base + route.name;

    %>'<%= route.name %>': <%= route.name %>,

    <%

        if (route.children && route.children.length) {
            for (var i = 0; i < route.children.length; i += 1) {
                parseRoute(route.children[i], routeUrl);
            }
        }
    }

    for (var i = 0; i < routes.length; i += 1) {
        parseRoute(routes[i], '/');
} %>});

// -----------------------------------------
// EXPORT

export default store;
