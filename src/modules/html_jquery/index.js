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
    templateBase(self, '/html_jquery/templates', {
        in: [
            '.editorconfig', '.gitignore', '.eslintrc',
            '.eslintignore', 'package.json', 'README.md',
            'tasks/build.js',
            'config/config.js', 'config/mapping.js',
            'src/favicon.ico', 'src/sdk/sdk.js',
            'src/bootstrap.js',
            'src/containers/_assets/html/index.html'
        ]
    });

    // Create empty folders
    createFolders(self, [
        'build', 'test',
        'src/sdk/modules'
    ]);
};

// -----------------------------------------
// EXPORT

export { init };
