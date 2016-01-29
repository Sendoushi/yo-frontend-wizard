'use strict';

// -----------------------------------------
// VARS

var exec = require('child_process').exec;
var path = require('path');
var generators = require('yeoman-generator');
var string = require('./utils/string.js');
var promptsJson = require('./prompts.json');

// -----------------------------------------
// EXPORT

module.exports = generators.Base.extend({
    // -----------------------------------------
    // PUBLIC FUNCTIONS

    /**
     * Initialize yeoman
     * @method init
     */
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            var toExec;

            if (!this.options['skip-install']) {
                toExec = 'git init; npm install';

                if (!!this.props.tech.bower) {
                    toExec += '; bower install';
                }

                if (this.props.structure === 'php' || this.props.structure === 'slim_twig') {
                    toExec += '; composer install';
                }

                this.log('\n\nInstalling dependencies...\n');

                exec(toExec, function (error, stdout, stderr) {
                    if (error || stderr) {
                        console.error(error || stderr);
                    } else {
                        console.log(stdout);
                    }
                });

                // TODO: Should it add origin and make the first commit?
            }
        }.bind(this));
    },

    /**
     * Takes care of questions to prompt
     * @method askFor
     */
    askFor: function () {
        var done = this.async();

        // Finally prompt!
        this.prompt(promptsJson, function (props) {
            var newProps = props;

            // Objectify tech
            newProps.tech = this._objectifyArr(newProps.tech);

            // Take care of routes
            newProps.routes = this._parseRoute(newProps.routes);

            this.props = newProps;
            done();
        }.bind(this));
    },

    /**
     * Copy the template files
     * @method writing
     */
    writing: function () {
        var props;
        var common;
        var structure;
        var specific;

        // Set initial source in modules
        this.sourceRoot(path.join(this.sourceRoot(), '../modules'));

        props = this.props;

        // Take care of common
        common = require('./modules/common/index.js');
        common.init(this, props);

        // Take care of specific
        structure = props.structure;
        if (structure === 'none') {
            return;
        }

        specific = require('./modules/' + structure + '/index.js');
        specific.init(this, props);
    },

    // -----------------------------------------
    // PRIVATE FUNCTIONS

    /**
     * Objectifies array
     * @method  _objectifyArr
     * @param   {array} arr
     * @return  {object}
     * @private
     */
    _objectifyArr: function (arr) {
        var obj = {};
        var i;

        for (i = 0; i < arr.length; i += 1) {
            obj[arr[i]] = true;
        }

        return obj;
    },

    /**
     * Parses route into an array of objects
     * @method  _parseRoute
     * @param   {string} str
     * @return  {array}
     * @private
     */
    _parseRoute: function (str) {
        var routes;

        this._hierarchyRoutes = this._hierarchyRoutes.bind(this);
        this._objectifyRoutes = this._objectifyRoutes.bind(this);

        // First, we split the pages
        routes = str.replace(/ /g, '').split(',');

        // Split hierarchy into arrays
        routes = this._hierarchyRoutes(routes);

        // home, contact, portfolio, -single, --single_comment, --single_author, terms_and_conditions, regulations, -faq, shop

        return routes;
    },

    /**
     * Hierarchies routes
     * @method  _hierarchyRoutes
     * @param   {array} arr
     * @return  {array}
     * @private
     */
    _hierarchyRoutes: function (arr) {
        var hierarchy = [];
        var i;

        // Split hierarchy into arrays
        for (i = 0; i < arr.length; i += 1) {
            // We need to create a new hierarchy
            if (arr[i][0] !== '-') {
                hierarchy.push([]);
            }

            // Add the route to hierarchy
            hierarchy[hierarchy.length - 1].push(arr[i]);
        }

        // Objectify the routes now
        hierarchy = hierarchy.map(this._objectifyRoutes);

        return hierarchy;
    },

    /**
     * Objetifies routes
     * @method  _objectifyRoutes
     * @param   {array} arr
     * @return  {object}
     * @private
     */
    _objectifyRoutes: function (arr) {
        var children;

        if (!arr || !arr.length) {
            return;
        }

        children = arr.map(function (child) {
            return (child[0] === '-') && child.slice(1, child.length);
        }).filter(function (child) {
            return !!child;
        });

        return {
            name: string.dashize(arr[0]),
            nameCamelcase: string.camelcase(arr[0]),
            nameAllCamelcase: string.camelcase(arr[0], true),
            children: this._hierarchyRoutes(children)
        };
    }
});
