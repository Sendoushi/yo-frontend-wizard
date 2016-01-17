(function () {
    'use strict';

    let is = require('is.js');
    let outdatedBrowser = require('outdatedbrowser.js');

    let Router = require('Bedrock/Router.js');
    let states = require('config/states.js');
    let AppController = require('structure/App/AppController.js');

    // -----------------------------------------
    // FUNCTIONS

    /**
     * Initialize the app
     */
    let init = () => {
        let bodyEl = document.getElementById('body');
        let classList = bodyEl.classList;

        // Remove class no-script
        classList.remove('no-script');

        is.ie() && classList.add('is-ie');
        is.mobile() && classList.add('is-mobile');

        // Set outdated browser
        outdatedBrowser({
            lowerThan: '<% if (minie === "edge") { %>edge<% } else { %>IE<%= minie %><% } %>',
            languagePath: ''
        });

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

    <% if (!!tech.jquery) { %>// Wait for the html to be fully ready before continuing
    // Initialize everything
    $(document).ready(init);<% } else { %>// Initialize everything
    init();<% } %>
})();
