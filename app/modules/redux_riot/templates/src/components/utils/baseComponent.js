import mixIn from 'mout/object/mixIn.js';

// -----------------------------------------
// VARS

// -----------------------------------------
// FUNCTIONS

/**
 * Adds view to the actions
 * @param  {store} store
 * @param  {tag} view
 */
let onUpdateComp = (self, state) => {
    if (!state) { return; }

    /* eslint-disable no-param-reassign */
    // Create the data object
    self.data = mixIn({}, self.data, state);
    /* eslint-enable no-param-reassign*/
};

// -----------------------------------------
// EXPORT

export { onUpdateComp };
