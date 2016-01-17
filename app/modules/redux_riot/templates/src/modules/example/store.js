'use strict';

import { initStore } from 'baseStore.js';

// -----------------------------------------
// VARS

const INITIAL_STATE = {
    example: null,
    err: null
};

// -----------------------------------------
// FUNCTIONS

/**
 * Example
 * @param  {object}  state
 * @param  {object}  action
 * @return {object}
 */
let example = (state, action) => {
    return state;
};

// -----------------------------------------
// Initialize store

var store = initStore(INITIAL_STATE, {
    'EXAMPLE': example
});

// -----------------------------------------
// EXPORT

export default store;
