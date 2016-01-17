'use strict';
import deepMixIn from 'mout/object/deepMixIn';
import Controller from 'Bedrock/Controller.js';
import <%= routeNameAllCamelcase %>View from './<%= routeNameAllCamelcase %>View.js';
<%
    var route;
    var i;

    for (i = 0; i < routeChildren.length; i += 1) {
        route = routeChildren[i];
%>import <%= route.nameAllCamelcase %>Controller from './<%= route.nameAllCamelcase %>/<%= route.nameAllCamelcase %>Controller.js';
<% } %>
// -----------------------------------------
// VARS
let controllerConfig = {
    name: '<%= routeNameAllCamelcase %>Controller'
};

let states = {
<%
    var routeEnd;
    var route;
    var i;

    for (i = 0; i < routeChildren.length; i += 1) {
        route = routeChildren[i];
        routeEnd = (i != routeChildren.length - 1) ? ',\n' : '';

%>    '<%= route.name %>': '<%= route.nameCamelcase %>State'<%= routeEnd %><% } %>
};

let content;

// Functions that will be set later
let destroyContent;

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Initialize
 * @param  {jquery} element Element where the View will render
 * @return {appcontroller}
 */
let initialize = function (element) {
    Controller.prototype.initialize.call(this);

    // Set keys to be bind with self
    this.bindToSelf([
    <%
        var routeEnd;
        var route;
        var i;

        for (i = 0; i < routeChildren.length; i += 1) {
            route = routeChildren[i];
            routeEnd = (i != routeChildren.length - 1) ? ',' : '';

    %>    '<%= route.nameCamelcase %>State'<%= routeEnd %>
    <% } %>]);

    this.view = this.adopt(new <%= routeNameAllCamelcase %>View());
    this.view.setElement(element);
    this.view.render();

    // Catch errors
    this.on('error', err => {
        // TODO: We should advise user
        // TODO: Take better care of errors
    });

    return this;
};

// -----------------------------------------
// STATE FUNCTIONS
<%
for (var i = 0; i < routeChildren.length; i += 1) {
    var route = routeChildren[i];
%>
/**
 * <%= route.name %> state handler
 * @method
 * @param {*} self
 * @param {object} state
 */
let <%= route.nameCamelcase %>State = (self, state) => {
    destroyContent(self.content, () => {
        // Set the posts controller
        let contentEl = self.view.getContent();
        self.content = self.adopt(new <%= route.nameAllCamelcase %>Controller(contentEl));
    });
};
<% } %>
// -----------------------------------------
// PRIVATE FUNCTIONS

destroyContent = (content, cb) => {
    content && content.destroy();

    // TODO: Add transition
    cb();
};

// -----------------------------------------
// EXPORT

export default Controller.extend(deepMixIn(controllerConfig, {
   <% for (var i = 0; i < routeChildren.length; i += 1) { %> <%= routeChildren[i].nameCamelcase %>State,<% } %>
    initialize, states
}));
