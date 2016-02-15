/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

let path = require('path');
let Promise = require('bluebird');
let spawn = require('child_process').spawn;
let webpack = require('webpack');
let ProgressPlugin = require('webpack/lib/ProgressPlugin');
let cwd = process.cwd();
let env = process.argv[2];

let buildPath = path.join(cwd, 'build');

let webpackConfig;
let progressFn;

// Set the webpack config
webpackConfig = {
    // webpack options
    entry: path.join(cwd, 'src', 'bootstrap.js'),
    output: { path: buildPath, filename: 'app.js' },
    stats: {
        // Configure the console output
        colors: true, modules: true, reasons: true
    },
    target: 'web',
    resolve: {
        modulesDirectories: [
            './', 'node_modules', 'bower_components',
            'src', 'src/utils', 'src/modules/utils', 'src/components/utils'
        ],
        alias: require(path.join(cwd, 'config/mapping.js'))
    },
    module: {
        loaders: [{
            test: /\.js?$/, loader: 'babel', query: { presets: ['es2015'] },
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.json?$/, loader: 'json',
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.html?$/, loader: 'raw',
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
    })
    .then(() => {
        let src = path.join(buildPath, 'app.js');
        let uglifyPath = path.join(cwd, 'node_modules/uglify-js/bin/uglifyjs');
        let uglifyCommand;
        let uglifyPromise;

        // Proceed with command
        uglifyCommand = spawn(uglifyPath, [src, '-o', src]);

        // Set the promise
        uglifyPromise = new Promise((resolve, reject) => {
            uglifyCommand.stderr.on('data', (data) => {
                reject(data);

                /* eslint-disable no-console */
                console.error('' + data);
                /* eslint-enable no-console */
            });

            uglifyCommand.on('close', (code) => {
                if (code !== 0) {
                    reject();
                } else {
                    resolve();
                }
            });
        });

        return uglifyPromise;
    });

    return promise;
};
