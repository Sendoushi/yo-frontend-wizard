'use strict';

import page from 'page/page.js';

// -----------------------------------------
// PRIVATE FUNCTIONS

/**
 * Find route from type
 * @param  {object} state
 * @param  {object} action
 */
let findRoute = (routes, type) => {
    let route;

    // Find the right route
    for (let i = 0; i < routes.length; i += 1) {
        route = routes[i];
        route = (route.type === type) ? route : null;

        if (route) { break; }
    }

    return route;
};

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Update on action
 * @param  {object} state
 * @param  {object} action
 */
var updateOnAction = (routes, state) => {
    if (!state || !state.content) { return; }

    let route = findRoute(routes, state.content.type);
    if (!route) { return; }

    // Route to url
    let urlParse = route.urlParse;
    let params = state.content.params;
    let url = !!urlParse ? urlParse(params) : route.url;

    // Navigate to the url
    (url !== page.current) && page.show(url);
};

/**
 * Sets routes
 * @param  {array} routes
 * @param  {string} base
 * @param  {string} type
 * @param  {object} params
 */
var setRoute = (routes, route) => {
    let routeFound = findRoute(routes, route.type);

    if (!routeFound) { return; }

    // Get the routeFound to url
    let urlParse = routeFound.urlParse || () => routeFound.url;
    return urlParse(route.params);
};

/**
 * Set routes
 * @param  {array} routes
 * @param  {string} base
 */
var init = (routes, getContent) => {
    // Set all routes
    for (let i = 0; i < routes.length; i += 1) {
        let route = routes[i];
        let fns = route.onRoute;

        // Force the array to exist
        fns = (typeof fns === 'function') ? [fns] : fns;

        // Go through each function
        for (let c = 0; c < fns.length; c += 1) {
            // Setup the go route
            fns[c] = fns[c].bind(null, route);
        }

        // Finally set the route
        page(route.url, ...fns);
    }

    // Start engines!
    page.start();
};

// -----------------------------------------
// EXPORT

export { updateOnAction };
export { setRoute };
export { init };
