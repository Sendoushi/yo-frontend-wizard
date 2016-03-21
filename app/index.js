/* eslint-disable strict, no-var */
'use strict';

var path = require('path');
var generators = require('yeoman-generator');
var gen;

// Register babel
require(path.join(__dirname, '../src/utils/babel.js'));

// Finally continue with the wizard
gen = require(path.join(__dirname, '../src/index.js'));

module.exports = generators.Base.extend(gen);
/* eslint-enable strict, no-var */
