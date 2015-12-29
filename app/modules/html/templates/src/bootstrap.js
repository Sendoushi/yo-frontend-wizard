(function () {
    'use strict';

    // -----------------------------------------
    // VARS

    let is = require('./utils/is.js');

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
    };

    // -----------------------------------------
    // PRIVATE FUNCTIONS

    // -----------------------------------------

    <% if (!!tech.jquery) { %>// Wait for the html to be fully ready before continuing
    // Initialize everything
    $(document).ready(init);<% } else { %>// Initialize everything
    init();<% } %>
})();
