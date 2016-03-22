const path = require('path');
const deepMixIn = require('mout/object/deepMixIn.js');
const bedrockConfig = require(path.join(__dirname, '../node_modules/bedrock/config/config.js'));

// Finally export the config
module.exports = deepMixIn(bedrockConfig, {});
