'use strict';
import riot from 'riot';
import outdatedBrowser from 'outdatedbrowser.js';
import { onUpdateComp } from 'baseComponent.js';
import actions from 'modules/app/actions.js';

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
 */
let onUnmount = (self) => actions.removeView(self);

/**
 * On update handler
 * @param  {object} state
 */
let onUpdate = (self, state) => onUpdateComp(self, state);

// -----------------------------------------
// Initialize

/**
 * Initialize
 * @param  {object} opts
 */
let init = function (opts) {
    // Set events for the view
    this.on('mount', onMount.bind(null, this));
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
    { JSON.stringify(data.content) }
    `,

    init
);
