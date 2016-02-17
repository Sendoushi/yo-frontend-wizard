import riot from 'riot';
import outdatedBrowser from 'utils/outdatedbrowser.js';
import { updateState } from 'components/utils/baseComponent.js';
import actions from 'modules/app/actions.js';

/**
 * On update handler
 * @param  {tag} self
 * @param  {*} opts
 * @param  {object} state
 */
let onUpdate = (self, opts, state) => {
    let newState = updateState(self.state, state);

    /* eslint-disable no-param-reassign */
    // Cache values
    self.state = newState || self.state;
    /* eslint-enable no-param-reassign*/
};

/**
 * On mount handler
 * @param  {tag} self
 * @param  {*} opts
 */
let onMount = (self, opts) => {
    // Set outdated browser
    outdatedBrowser({
        lowerThan: '<% if (minie === "edge") { %>edge<% } else { %>IE<%= minie %><% } %>',
        languagePath: ''
    });

    // Set update method
    self.on('update', onUpdate.bind(null, self, opts));

    // Add for the actions update
    actions.addView(self);
};

/**
 * On unmount handler
 * @param  {tag} self
 */
let onUnmount = (self) => actions.removeView(self);

// -----------------------------------------
// Initialize

/**
 * Initialize
 * @param  {*} opts
 */
let init = function (opts) {
    // Set events for the view
    this.on('mount', onMount.bind(null, this, opts));
    this.on('unmount', onUnmount.bind(null, this));
};

/**
 * Register the tag
 */
riot.tag('app',
    `
    <div id="outdated">
        <h6>Your browser is out-of-date!</h6>
        <p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p>
        <p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p>
    </div>
    { JSON.stringify(state.content) }
    `,

    init
);
