'use strict';
import riot from 'riot';
import outdatedBrowser from 'outdatedbrowser.js';
import { onUpdateComp } from 'baseComponent.js';
import actions from 'modules/example/actions.js';

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

    // Add the view to be updated with the store
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
    this.on('update', onUpdate.bind(null, this));
};

/**
 * Register the tag
 */
riot.tag('posts',
    `
    <div class="loading {is-loading: isLoading}"></div>
    <div each={posts}>

    </div>
    `,

    init
);
