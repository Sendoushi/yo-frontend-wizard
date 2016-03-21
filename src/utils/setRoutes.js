import { normalize, dashize, camelcase } from './string.js';

// -----------------------------------------
// VARS

let hierarchyRoutes;

// -----------------------------------------
// PRIVATE FUNCTIONS

/**
 * Objetifies routes
 * @param   {array} arr
 * @return  {object}
 */
const objectifyRoutes = arr => {
    if (!arr || !arr.length) {
        return;
    }

    const children = arr.map(child => {
        return (child[0] === '-') && child.slice(1, child.length);
    }).filter(child => !!child);

    return {
        name: dashize(arr[0]),
        nameCamelcase: camelcase(arr[0]),
        nameAllCamelcase: camelcase(arr[0], true),
        children: hierarchyRoutes(children)
    };
};

/**
 * Hierarchies routes
 * @param   {array} arr
 * @return  {array}
 */
hierarchyRoutes = arr => {
    let hierarchy = [];

    // Split hierarchy into arrays
    arr.forEach(route => {
        // We need to create a new hierarchy
        if (route[0] !== '-') {
            hierarchy.push([]);
        }

        // Add the route to hierarchy
        hierarchy[hierarchy.length - 1].push(route);
    });

    // Objectify the routes now
    hierarchy = hierarchy.map(objectifyRoutes);

    return hierarchy;
};

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Parses route into an array of objects
 * @param   {string} str
 * @return  {array}
 */
const parseRoute = str => {
    let routes = normalize(str);

    if (!routes) {
        return str;
    }

    // First, we split the pages
    routes = str.replace(/ /g, '').split(',');

    // Split hierarchy into arrays
    routes = hierarchyRoutes(routes);

    // home, contact, portfolio, -single, --single_comment, --single_author, terms_and_conditions, regulations, -faq, shop

    return routes;
};

/**
 * Makes a const out of a route
 * @param  {string} str
 * @return {string}
 */
const constRoute = (str) => {
    str = normalize(str);

    if (!str) {
        return str;
    }

    // Remove the first slash
    if (str[0] === '/') {
        str = str.slice(1, str.length);
    }

    // Underscorize and uppercase
    str = str.replace(/\//g, '_').toUpperCase();

    return str;
};

// -----------------------------------------
// EXPORT

export { parseRoute, constRoute };
