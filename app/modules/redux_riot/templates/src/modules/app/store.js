import { initStore } from 'baseStore.js';

// -----------------------------------------
// VARS

const INITIAL_STATE = {
    data: {
        content: {
            type: '',
            params: {}
        }
    }
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
    let newState = state;
    let content = action.content;

    // Set content
    newState.data.content = content;

    return newState;
};

// -----------------------------------------
// Initialize store

let store = initStore(INITIAL_STATE, {
    'SET_CONTENT': setContent
});

// -----------------------------------------
// EXPORT

export default store;
