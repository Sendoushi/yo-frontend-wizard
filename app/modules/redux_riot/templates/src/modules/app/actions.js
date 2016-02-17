import { addView, removeView } from 'modules/utils/baseActions.js';
import store from './store.js';

// -----------------------------------------
// VARS

// -----------------------------------------
// FUNCTIONS

/**
 * Sets content of app
 */
let setContent = (content) => {
    store.dispatchAction({ type: 'SET_CONTENT', content });
};

/**
 * Gets content of app
 */
let getContent = () => store.getState().content;

/**
 * Gets initial state of app
 */
let getInitial = () => store.getInitial();

// -----------------------------------------
// EXPORT

export default {
    addView: addView.bind(null, store),
    removeView: removeView.bind(null, store),

    getInitial, getContent, setContent
};
