'use strict';

import { addView, removeView } from 'baseActions.js';
import store from './store.js';

// -----------------------------------------
// VARS

// -----------------------------------------
// FUNCTIONS

/**
 * Sets content of app
 */
var setContent = (content) => {
    store.dispatchAction({ type: 'SET_CONTENT', content });
};

/**
 * Gets content of app
 */
var getContent = () => store.getState().content;

// -----------------------------------------
// EXPORT

export default {
    addView: addView.bind(null, store),
    removeView: removeView.bind(null, store),

    getContent, setContent
};
