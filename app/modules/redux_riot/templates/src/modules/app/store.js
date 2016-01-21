'use strict';

import { initStore } from 'baseStore.js';

// -----------------------------------------
// VARS

const INITIAL_STATE = {
    content: 'index',
    err: null
};

// -----------------------------------------
// FUNCTIONS

/**
 * Sets content
 * @param  {object}  state
 * @param  {object}  action
 * @return {object}
 */
let setContent = (state, action) => {
    let content = action.content;

    // Set content
    state.content = content;

    return state;
};

// -----------------------------------------
// Initialize store

var store = initStore(INITIAL_STATE, {
    'SET_CONTENT': setContent
});

// -----------------------------------------
// EXPORT

export default store;
