import deepMixIn from 'mout/object/deepMixIn.js';
import deepClone from 'mout/lang/deepClone.js';
import deepFillIn from 'mout/object/deepFillIn.js';
import deepEquals from 'mout/lang/deepEquals.js';

// -----------------------------------------
// VARS

// -----------------------------------------
// FUNCTIONS

/**
 * Updates state of component
 * @param  {object} stateToUpd
 * @param  {object} state
 * @param  {object} filler
 */
let updateState = (stateToUpd, state, filler) => {
    let newState = deepMixIn({}, deepClone(stateToUpd), deepClone(state));
    let equals = deepEquals(stateToUpd, newState);

    // Fill in with the filler
    newState = !!filler ? deepFillIn(newState, filler) : newState;

    return !equals ? newState : null;
};

// -----------------------------------------
// EXPORT

export { updateState };
