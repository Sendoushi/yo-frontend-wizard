/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

let fs = require('fs');
let path = require('path');
let Promise = require('bluebird');

let postcss = require('postcss');
let sass = require('node-sass');
let autoprefixer = require('autoprefixer');
let cssnano = require('cssnano');
let pixrem = require('pixrem');

let cwd = process.cwd();
let env = process.argv[2];

let styleFiles = [{
    src: path.join(cwd, 'src/components/_assets/css/main.scss'),
    dest: 'build/app.css'
}];

// Export
module.exports = () => {
    // Take care of sass and css
    let promises;

    // Set the promises for each file
    promises = styleFiles.map(val => {
        // Render sass
        return (new Promise((resolve, reject) => {
            sass.render({
                file: val.src,
                // Needed for source map
                outFile: val.dest,
                sourceMap: env !== 'prod' // Not working!
            }, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    // Resolve with the right css
                    resolve('' + result.css);
                }
            });
        }))
        .then(data => {
            let autoprefixerOpts = autoprefixer({ browsers: 'last 2 versions, IE 11' });
            let postcssPlugins = [pixrem, autoprefixerOpts, cssnano];

            // Next are only for prod
            if (env !== 'prod') {
                return data;
            }

            // Take care of postcss
            return postcss(postcssPlugins).process(data)
            .then((postData) => postData.css);
        })
        .then(data => {
            // Write the file
            fs.writeFileSync(val.dest, data);
        });
    });

    return Promise.all(promises);
};
