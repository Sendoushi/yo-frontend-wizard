import { isIe, isMobile } from 'bedrock/is';

// Wait for the document to be ready
document.addEventListener('DOMContentLoaded', function () {
    const classList = document.body.classList;

    // Remove class no-script
    classList.remove('no-script');

    if (isIe()) {
        classList.add('is-ie');
    }

    if (isMobile()) {
        classList.add('is-mobile');
    }
});
