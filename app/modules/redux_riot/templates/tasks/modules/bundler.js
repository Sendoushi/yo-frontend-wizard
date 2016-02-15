/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

let path = require('path');
let Promise = require('bluebird');
let webpack = require('webpack');
let ProgressPlugin = require('webpack/lib/ProgressPlugin');
let cwd = process.cwd();
let env = process.argv[2];

let mapping = require(path.join(cwd, 'config/mapping.js'));
let srcPath = path.join(cwd, 'src');
let buildPath = path.join(cwd, 'build');

let srcFile = path.join(srcPath, 'bootstrap.js');
let webpackConfig;
let progressFn;

// Set the webpack config
webpackConfig = {
    // webpack options
    entry: srcFile,
    output: {
        path: buildPath,
        filename: 'app.js'
    },
    stats: {
        // Configure the console output
        colors: true,
        modules: true,
        reasons: true
    },
    target: 'web',
    resolve: {
        modulesDirectories: [
            './',
            'node_modules',
            'bower_components',
            'src',
            'src/utils',
            'src/modules/utils',
            'src/components/utils'
        ],
        alias: mapping
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel',
            query: { presets: ['es2015'] },
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.json?$/,
            loader: 'json',
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.html?$/,
            loader: 'raw',
            exclude: /(node_modules|bower_components)/
        }]
    },
    externals: {},
    // TODO: Source map not working as it should
    devtool: env !== 'prod' && 'source-map',
    cache: env === 'prod',
    watch: env !== 'prod',
    debug: env !== 'prod',
    plugins: env === 'prod' && [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
};

/**
 * Progress plugin function
 * @param  {number} percentage
 * @param  {string} msg
 */
progressFn = (percentage) => {
    let newPercent = Math.floor(percentage * 100);
    let newMsg = `${newPercent}% `;
    let lineSize = 100 / 2;
    let done = 0;
    let valDone;

    // Now set the line progress
    done = 0;
    while (lineSize > done) {
        valDone = Math.floor(newPercent / 2);
        newMsg += (done <= valDone) ? '=' : '.';
        done += 1;
    }

    // Set the spacing depending on the percentage
    if (newPercent < 10) {
        newMsg = `  ${newMsg}`;
    } else if (newPercent < 100) {
        newMsg = ` ${newMsg}`;
    }

    // Now lets log the progress
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(newMsg);

    if (percentage >= 1) {
        process.stdout.write('\n');
    }
};

// Export
module.exports = () => {
    // Set the promise
    let promise = new Promise((resolve, reject) => {
        let compiler;

        // Set the webpack
        compiler = webpack(webpackConfig);

        // Set plugins
        compiler.apply(new ProgressPlugin(progressFn));

        // Run now
        compiler.run(function (err, stats) {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    });

    return promise;
};
