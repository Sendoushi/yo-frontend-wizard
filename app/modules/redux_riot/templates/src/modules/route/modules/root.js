'use strict';

import appActions from 'modules/app/actions.js';

// -----------------------------------------
// FUNCTIONS
<%
var routesParsed = routes.map(function (val) {
    return val.routeCamelcase;
});

for (var i = 0; i < routes.length; i += 1) {
    var routeParsed = routes[i];
%>
/**
 * <%= routeParsed.routeCamelcase %>
 */
let <%= routeParsed.routeCamelcase %> = {
    'type': '<%= routeParsed.routeConst %>',
    'url': '<%= routeParsed.routeUrl %>',
    'onRoute': (route, ctx, next) => {
        let params = ctx.params;
        let type = route.type;

        appActions.setContent({ type, params });
    }
};
<%
}
%>
// -----------------------------------------
// EXPORT

export default [<%= routesParsed.join(', ') %>];
