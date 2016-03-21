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
    templateBase(self, '/style/templates', {
        in: [
            'src/components/_assets/css/main.scss',
            'src/components/_assets/css/general/buttons.scss',
            'src/components/_assets/css/general/general.scss',
            'src/components/_assets/css/general/global.scss',
            'src/components/_assets/css/general/grid.scss',
            'src/components/_assets/css/general/icons.scss',
            'src/components/_assets/css/general/table.scss',
            'src/components/_assets/css/general/type.scss',
            'src/components/_assets/css/general/utils.scss'
        ]
    });
};

// -----------------------------------------
// EXPORT

export { init };
