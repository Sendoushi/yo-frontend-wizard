import appActions from '../../modules/actions.js';

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
    /**
     * Url parsing
     * @param  {object} params
     * @return {string}
     */
    /*'urlParse': (params) => {
        return '/example/' + params.id;
    },*/
    /**
     * Route handler
     * @param  {object} route
     * @param  {object} ctx
     * @param  {function} next
     */
    onRoute: (route, ctx) => {
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
