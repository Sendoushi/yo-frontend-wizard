'use strict';
import deepMixIn from 'mout/object/deepMixIn';
import _ from 'underscore';
import View from 'Bedrock/View.js';
import tmpl from './_assets/html/<%= routeName %>.html';

// -----------------------------------------
// VARS

let viewConfig = {
    name: '<%= routeNameAllCamelcase %>View',
    tagName: 'div',
    template: _.template(tmpl),
    className: '<%= routeName %>-view'
};

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Initialize
 * @return {appview}
 */
let initialize = function () {
    View.prototype.initialize.call(this);

    // Set keys to be bind with self
    this.bindToSelf(['getContent']);

    return this;
};

/**
 * Render
 * @param  {*} self
 * @param  {object} data Object to be rendered
 */
let render = (self, data) => {
    View.prototype.render(self, data);

    // Cache elements
    self.contentEl = self.$element.find('.content');
};

/**
 * Gets content element
 * @param  {*} self
 * @return {jquery}
 */
let getContent = self => self.contentEl;

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORT

export default View.extend(deepMixIn(viewConfig, {
    initialize, render, getContent
}));
