/* eslint-disable no-var */
var path = require('path');

// Get modules
var modules = path.join(__dirname, '../../node_modules');
var core = require(path.join(modules, 'babel-core/register'));
var tR = path.join(modules, 'babel-plugin-transform-runtime');

module.exports = core({
    presets: [
        require.resolve(path.join(modules, 'babel-preset-stage-2')),
        require.resolve(path.join(modules, 'babel-preset-es2015'))
    ],
    plugins: [tR]
});

/* eslint-enable no-var */
