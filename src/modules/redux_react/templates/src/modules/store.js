import { createStore, compose, combineReducers } from 'redux';
import appStore from './app/store.js';

// -----------------------------------------
// VARS

const INITIAL_STATE = {
    app: appStore.getInitial()
};

// -----------------------------------------
// Initialize

const reducers = combineReducers({
    app: appStore.reducers
});

const isDev = process && process.env && process.env.NODE_ENV === 'development';
const devTools = window.devToolsExtension;
const finalCreateStore = compose(
    (isDev && devTools) ? devTools() : f => f
)(createStore);
const store = finalCreateStore(reducers);

// Register more methods
store.getInitial = () => INITIAL_STATE;

// -----------------------------------------
// EXPORT

export default store;
