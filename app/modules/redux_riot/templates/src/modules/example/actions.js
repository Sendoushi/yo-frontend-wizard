'use strict';

import { addView, removeView } from 'baseActions.js';
import store from './store.js';

// -----------------------------------------
// VARS

// -----------------------------------------
// FUNCTIONS

/**
 * Start metronome
 */
var example = () => {
    store.dispatchAction({
        type: 'EXAMPLE'
    });
};

// -----------------------------------------
// EXPORT

export default {
    addView: addView.bind(null, store),
    removeView: removeView.bind(null, store),

    example
};
