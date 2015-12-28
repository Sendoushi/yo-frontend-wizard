'use strict';

// -----------------------------------------
// VARS

var path = require('path');
var generators = require('yeoman-generator');
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
            if (!this.options['skip-install']) {
                this.installDependencies();

                // TODO: Initialize git
            }
        });
    },

    /**
     * Takes care of questions to prompt
     * @method askFor
     */
    askFor: function () {
        var done = this.async();

        // Finally prompt!
        this.prompt(promptsJson, function (props) {
            // Objectify tech
            props.tech = this._objectifyArr(props.tech);

            // Take care of routes
            props.routes = this._parseRoute(props.routes);

            this.props = props;
            done();
        }.bind(this));
    },

    /**
     * Copy the template files
     * @method writing
     */
    writing: function () {
        // Set initial source in modules
        this.sourceRoot(path.join(this.sourceRoot(), '../modules'));

        var props = this.props;
        var structure = props.structure;

        var common = require('./modules/common/index.js');
        var specific = require('./modules/' + structure + '/index.js');

        // Initialize modules
        common.init(this, props);
        specific.init(this, props);

        // // Install dependencies
        // this.log(dstPath + ', ' + srcPath);
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

        for (var i = 0; i < arr.length; i += 1) {
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
        var arr = [];

        return arr;
    }
});
