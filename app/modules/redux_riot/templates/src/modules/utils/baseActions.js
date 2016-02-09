// -----------------------------------------
// VARS

// -----------------------------------------
// FUNCTIONS

/**
 * Adds view to the actions
 * @param  {store} store
 * @param  {tag} view
 */
let addView = (store, view) => store.addView(view);

/**
 * Removes view from the actions
 * @param  {store} store
 * @param  {tag} view
 */
let removeView = (store, view) => store.removeView(view);

/**
 * Takes care of a request
 * @param  {store} store
 * @param  {function} req
 * @param  {string} action
 */
let actionRequest = (store, req, action) => {
    // Set loading
    store.dispatchAction({
        type: action,
        loading: true,
        err: null,
        data: null
    });

    // Make the request
    req()
    .then((data) => {
        store.dispatchAction({
            type: action,
            loading: false,
            err: null,
            data
        });
    })
    .catch((err) => {
        // TODO: Take care of errors
        console.error(err);

        // Dispatch the error
        store.dispatchAction({
            type: action,
            loading: false,
            err,
            data: null
        });
    });
};

// -----------------------------------------
// EXPORT

export { addView };
export { removeView };
export { actionRequest };
