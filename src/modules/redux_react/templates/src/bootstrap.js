import { isIe, isMobile } from 'bedrock/is';
import { mountApp } from 'containers/app.js';

// Wait for the document to be ready
document.addEventListener('DOMContentLoaded', function () {
    const bodyWrapper = document.getElementById('body-wrapper');
    const classList = document.body.classList;

    // Remove class no-script
    classList.remove('no-script');

    if (isIe()) {
        classList.add('is-ie');
    }

    if (isMobile()) {
        classList.add('is-mobile');
    }

    // Mount app
    mountApp(bodyWrapper);

    // Router
    require('route/router.js');
});
