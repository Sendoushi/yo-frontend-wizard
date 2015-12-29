(function () {
    'use strict';

    // -----------------------------------------
    // VARS

    let is = require('./utils/is.js');
    let Router = require('Bedrock/Router.js');
    let states = require('config/states.js');
    let AppController = require('structure/App/AppController.js');

    // -----------------------------------------
    // PUBLIC FUNCTIONS

    /**
     * Initialize the app
     */
    let init = () => {<% if (!!tech.jquery) { %>
        let bodyEl = $('body');

        // There is no need for this anymore
        bodyEl.removeClass('no-script');

        // Find if is mobile
        bodyEl.addClass(is.mobile() ? 'is-mobile' : 'is-desktop');

        // Find if is IE
        !!is.ie() && bodyEl.addClass('is-ie');
        <% } else { %>
        // TODO: Set mobile
        // TODO: Set ie
        // TODO: Remove class no-script<% } %>

        // Initialize
        let router = new Router(states, { trigger: true });
        let app = new AppController(document.body);

        // Router adopts the main controller
        router.on('router#change', state => app.setState(state));

        // Listen for app events
        app.on('bedrockrouter:navigate', route => {
            router.trigger('bedrockrouter:navigate', route);
        });

        // Starts router
        router.start();
    };

    // -----------------------------------------
    // PRIVATE FUNCTIONS

    // -----------------------------------------

    <% if (!!tech.jquery) { %>// Wait for the html to be fully ready before continuing
    // Initialize everything
    $(document).ready(init);<% } else { %>// Initialize everything
    init();<% } %>
})();
