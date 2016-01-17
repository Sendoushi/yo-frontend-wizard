(function () {
    'use strict';

    let is = require('is.js');
    let outdatedBrowser = require('outdatedbrowser.js');

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
    };

    // -----------------------------------------

    <% if (!!tech.jquery) { %>// Wait for the html to be fully ready before continuing
    // Initialize everything
    $(document).ready(init);<% } else { %>// Initialize everything
    init();<% } %>
})();
