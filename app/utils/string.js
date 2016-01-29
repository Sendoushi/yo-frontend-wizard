'use strict';

// -----------------------------------------
// VARS

// -----------------------------------------
// EXPORT

module.exports = {
    // -----------------------------------------
    // PUBLIC FUNCTIONS

    /**
     * Dashizes string
     * @method  dashize
     * @param   {string} str
     * @return  {string}
     */
    dashize: function (str) {
        var newStr = this._redo(str);

        return newStr.toLowerCase().replace(/ /g, '-');
    },

    /**
     * Camelcases string
     * @method  camelcase
     * @param   {string} str
     * @param   {boolean} alsoFirst
     * @return  {string}
     */
    camelcase: function (str, alsoFirst) {
        var newStr = this._redo(str);

        if (!newStr) {
            return;
        }

        // Lower everything and remove hiphenization, underscores and /
        newStr = newStr.toLowerCase().replace(/-/g, ' ').replace(/_/g, ' ').replace(/\//g, ' ');

        // Uppercase all
        newStr = newStr.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
            return p1 + p2.toUpperCase();
        });

        // Remove spaces
        newStr = newStr.replace(/ /g, '');

        // First shouldn't be camel case
        if (!alsoFirst) {
            newStr = newStr[0].toLowerCase() + newStr.slice(1, newStr.length);
        }

        return newStr;
    },

    /**
     * Makes a const out of a route
     * @param  {string} str
     * @return {string}
     */
    constRoute: function (str) {
        var newStr = str;

        // Remove the first slash
        if (newStr[0] === '/') {
            newStr = newStr.slice(1, newStr.length);
        }

        // Underscorize and uppercase
        newStr = newStr.replace(/\//g, '_').toUpperCase();

        return newStr;
    },

    // -----------------------------------------
    // PRIVATE FUNCTIONS

    /**
     * Redo string and makes sure is a string
     * @method  _redo
     * @param   {string} str
     * @return  {string}
     * @private
     */
    _redo: function (str) {
        return !!str ? ('' + str).trim() : null;
    }
};
