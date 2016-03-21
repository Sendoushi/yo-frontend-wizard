import { createFolders } from './createFolders.js';

// -----------------------------------------
// VARS

// -----------------------------------------
// FUNCTIONS

/**
 * Creates assets folder
 * @param   {yo} self
 * @param   {array} routes
 */
const createAssets = (self, routes) => {
    routes.forEach(route => {
        createFolders(self, [
            `${route}/_assets`,
            `${route}/_assets/img`,
            `${route}/_assets/svg`,
            `${route}/_assets/css`
        ]);
    });
};

// -----------------------------------------
// EXPORT

export { createAssets };
