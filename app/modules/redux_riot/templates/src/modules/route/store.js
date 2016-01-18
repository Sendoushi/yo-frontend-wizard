'use strict';

import riot from 'riot';
import { initStore } from 'baseStore.js';

// -----------------------------------------
// VARS

const INITIAL_STATE = {
    routes: null,
    // TODO: Solve the base
    base: '#',
    err: null
};

// -----------------------------------------
// FUNCTIONS

/**
 * Initialize routing
 * @param  {object} state
 * @param  {object} action
 * @return {object}
 */
let init = (state, action) => {
    state.routes = action.routes;

    let routes = state.routes;
    let routesKeys = Object.keys(routes);
    let i;

    // Now lets set the routes
    for (i = 0; i < routesKeys.length; i += 1) {
        riot.route(routesKeys[i], routes[routesKeys[i]]);
    }

    // Start engines!
    riot.route.base(state.base);
    riot.route.start(true);

    return state;
};

/**
 * Set routing
 * @param  {object} state
 * @param  {object} action
 * @return {object}
 */
let setRoute = (state, action) => {
    riot.route(action.route);

    return state;
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

%>
/**
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
}
%>
// -----------------------------------------
// Initialize store

var store = initStore(INITIAL_STATE, {
    'INIT': init,
    'SET_ROUTE': setRoute,
<%
    function parseRouteObj(route, base) {
        var routeUrl = base + route.name;

%>    '<%= route.name.toUpperCase() %>': <%= route.name %>,

    <%

        if (route.children && route.children.length) {
            for (var i = 0; i < route.children.length; i += 1) {
                parseRouteObj(route.children[i], routeUrl);
            }
        }
    }

    for (var i = 0; i < routes.length; i += 1) {
        parseRouteObj(routes[i], '/');
} %>
});

// -----------------------------------------
// EXPORT

export default store;
