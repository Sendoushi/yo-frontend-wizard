import { templateBase } from '../../utils/templateBase.js';

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
    templateBase(self, '/none/templates', {
        in: [
            '.editorconfig', '.gitignore', '.eslintrc',
            '.eslintignore', 'package.json', 'README.md'
        ]
    });
};

// -----------------------------------------
// EXPORT

export { init };
