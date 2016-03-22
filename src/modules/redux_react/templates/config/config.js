const path = require('path');
const deepMixIn = require('mout/object/deepMixIn.js');
const bedrockConfig = require(path.join(__dirname, '../node_modules/bedrock/config/config.js'));

/**
 * Gets icon
 * @param  {string} set
 * @param  {string} name
 * @param  {string} path
 * @return {*}
 */
// const getIcon = (name, pathSrc, set) => {
//     pathSrc = pathSrc || bedrockConfig.icons[set].path;
//     return require(path.join(pathSrc, `${name}.js`));
// };

// Finally export the config
module.exports = deepMixIn(bedrockConfig, {
    icons: {
        fa: {
            list: {}
        }
    }
});
