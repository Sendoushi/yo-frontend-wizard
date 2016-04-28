import { isIe, isMobile } from 'bedrock/is';
import outdatedBrowser from 'bedrock/outdatedbrowser';

/* eslint-disable no-undef */
const $ = jQuery;
/* eslint-enable no-undef */

// Wait for the document to be ready
$(document).ready(() => {
    const classList = document.body.classList;

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
});
