import { isIe, isMobile } from 'is.js';

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

    if (isIe()) {
        classList.add('is-ie');
    }

    if (isMobile()) {
        classList.add('is-mobile');
    }

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
