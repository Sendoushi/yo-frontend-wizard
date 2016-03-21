import path from 'path';
import { templateBase } from '../../utils/templateBase.js';
import { createFolders } from '../../utils/createFolders.js';
import { createAssets } from '../../utils/createAssets.js';

// -----------------------------------------
// VARS

// -----------------------------------------
// PRIVATE FUNCTIONS

/**
 * Sets routes
 * @param   {yo} self
 * @param   {object} props
 * @param   {string} base
 */
const setRoutes = (self, props, base) => {
    let templateTwig;
    let assetsArr;
    let routePath;
    let routes;

    if (!!props && typeof props === 'object') {
        routes = props.length && props || props.routes;
    }

    routes = routes || [];

    templateTwig = 'src/modules/structure.html.twig';
    assetsArr = [];

    // Go through each route
    routes.forEach(route => {
        routePath = base;

        // Index / Home should be on root
        if (route.name !== 'index' && route.name !== 'home') {
            routePath = path.join(routePath, route.name);
        }

        // Set for assets
        assetsArr.push(routePath);

        // Create the file templated
        templateBase(self, '/slim_twig/templates', {
            in: [templateTwig],
            out: [
                path.join(routePath, route.name + '.html.twig')
            ]
        }, {
            name: props.name,
            routeName: route.name,
            routePath: routePath.replace('src/', '')
        });

        if (route.children && route.children.length) {
            setRoutes(self, route.children, routePath);
        }
    });

    // Now create assets
    createAssets(self, self.props, assetsArr);
};

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Initialize module
 * @param   {yo} self
 */
const init = self => {
    // Templates files in the root
    templateBase(self, '/slim_twig/templates', {
        in: [
            '.editorconfig', '.gitignore', '.eslintrc',
            '.eslintignore', 'package.json', 'README.md',
            'composer.json', 'tasks/build.js',
            'src/favicon.ico',
            'src/bootstrap.js'
        ]
    });

    // Create empty folders
    createFolders(self, [
        'build', 'test'
    ]);

    // Set routes
    setRoutes(self, 'src/modules');
};

// -----------------------------------------
// EXPORT

export default { init };
