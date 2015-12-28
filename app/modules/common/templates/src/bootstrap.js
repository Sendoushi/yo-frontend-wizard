(function () {
    'use strict';

    // -----------------------------------------
    // VARS

    // -----------------------------------------
    // PUBLIC FUNCTIONS

    /**
     * Initialize the app
     */
    let init = () => {
    };

    // -----------------------------------------
    // PRIVATE FUNCTIONS

    // -----------------------------------------

    <% if (!!tech.jquery) { %>// Wait for the html to be fully ready before continuing
    // Initialize everything
    $(document).ready(init);<% } else { %>// Initialize everything
    init();<% } %>
})();
