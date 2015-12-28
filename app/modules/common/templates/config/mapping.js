'use strict';

module.exports = {<% if(!!tech.mout) { %>
    'mout': 'mout',<% } %><% if(!!tech.sdk) { %>
    'sdk': 'sdk/sdk.js',<% } %>
    'outdatedbrowser': 'outdated-browser/outdatedbrowser/outdatedbrowser.js'
};
