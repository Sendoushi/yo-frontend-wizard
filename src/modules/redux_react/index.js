import { templateBase } from '../../utils/templateBase.js';
import { createFolders } from '../../utils/createFolders.js';

// -----------------------------------------
// VARS

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Initialize module
 * @param   {yo} self
 */
const init = self => {
    // Templates files in the root
    templateBase(self, '/redux_react/templates', {
        in: [
            '.editorconfig', '.gitignore', '.eslintrc',
            '.eslintignore', 'package.json', 'README.md',
            'tasks/build.js', 'build/.htaccess',
            'config/config.js', 'config/mapping.js',
            'src/favicon.ico', 'src/sdk/sdk.js',
            'src/bootstrap.js',
            'src/modules/actions.js',
            'src/modules/store.js',
            'src/modules/app/actions.js',
            'src/modules/app/store.js',
            'src/route/router.js',
            'src/route/modules/root.js',
            'src/containers/app.js',
            'src/containers/_assets/html/index.php'
        ]
    });

    // Create empty folders
    createFolders(self, [
        'test',
        'src/sdk/modules'
    ]);
};

// -----------------------------------------
// EXPORT

export { init };
