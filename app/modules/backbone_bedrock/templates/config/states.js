'use strict';

export default {
<%
    var routeUrl;
    var routeName;
    var routeEnd;
    var route;
    var i;

    for (i = 0; i < routes.length; i += 1) {
        route = routes[i];
        routeName = route.name;
        routeUrl = routeName === 'index' ? '' : routeName;
        routeEnd = (i != routes.length - 1) ? ',\n' : '';

%>    '<%= routeUrl %>': '<%= routeName %>'<%= routeEnd %><% } %>
};
