/*jshint node:true, es3:false, latedef:false*/
module.exports = function (grunt) {
    'use strict';

    var isProd = process.argv[1] === 'prod';
    var fs = require('fs');
    var rm = require('rimraf');
    var webpack = require('webpack');
    var mapping = require('../config/mapping.js');

    // Load all grunt tasks in node_modules
    grunt.file.expand('../node_modules/grunt-*/tasks').forEach(grunt.loadTasks);

    // The config
    grunt.initConfig({
        webpack: {
            build: {
                // webpack options
                entry: '../src/bootstrap.js',
                output: {
                    path: '../build/',
                    filename: 'app.js'
                },
                // TODO: Source map not working as it should
                devtool: !isProd && 'source-map',
                stats: {
                    // Configure the console output
                    colors: true,
                    modules: true,
                    reasons: true
                },
                target: 'web',
                cache: isProd,
                watch: !isProd,
                debug: !isProd,
                resolve: {
                    modulesDirectories: ['./', 'node_modules', 'bower_components', 'src'],
                    alias: mapping
                },
                module: {
                    loaders: [{
                        test: /\.js?$/,
                        loader: 'babel',
                        query: !isProd && {
                            optional: ['runtime'],
                            stage: 0
                        }
                    }, {
                        test: /\.json?$/,
                        loader: 'json',
                        exclude: /(node_modules|bower_components)/
                    }]
                },
                externals: {<% if (!!tech.jquery) { %>
                    // require("jquery") is external and available
                    //  on the global var jQuery
                    'jquery': 'jQuery',
                    '$': '$'<% } %>
                },
                plugins: isProd && [<% if (!!tech.jquery) { %>
                    new webpack.IgnorePlugin(new RegExp('^(jquery|react)$')),<% } %>
                    new webpack.optimize.DedupePlugin()
                ]
            }
        },
        sass_globbing: {
            target: {
                files: {
                    '../build/app.scss': [
                        '../src/components/_assets/css/main.scss',
                        '../src/structure/_assets/css/main.scss'
                    ]
                }
            }
        },
        sass: {
            target: {
                files: {
                    '../build/app.css': '../build/app.scss'
                }
            },
            options: {
                sourceMap: !isProd
            }
        },
        autoprefixer: {
            target: {
                files: {
                    '../build/app.css': '../build/app.css'
                }
            },
            options: {
                browsers: ['last 2 versions', <%= minie %>],
                diff: !isProd
            }
        },
        pixrem: {
            target: {
                files: {
                    '../build/app.css': '../build/app.css'
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    '../build/app.css': ['../build/app.css']
                }
            }
        },
        uglify: {
            mangle: {
                except: [<% if (!!tech.jquery) { %>'$', 'jQuery'<% } %>]
            },
            target: {
                files: {
                    '../build/app.js': ['../build/app.js']
                }
            }
        },
        copy: {
            main: {
                files: [
                    // import folders
                    { expand: true, cwd: '../src/structure', src: ['index.php'], dest: '../build/' },
                    { expand: true, cwd: '../src', src: [
                        'structure/**/*.twig',
                        'structure/**/_assets/**/*',
                        'components/**/*',
                        'lib_php/**/*'
                    ], dest: '../build/' },
                    { expand: true, cwd: '../', src: ['composer/**/*'], dest: '../build/' },
                    // import favicon
                    { expand: true, cwd: '../src', src: ['*.ico'], dest: '../build/' },
                    // Outdated browser
                    {
                        expand: true,
                        cwd: '../node_modules/outdated-browser/outdatedbrowser',
                        src: ['outdatedbrowser.min.js', 'lang/en.html'],
                        dest: '../build/outdatedbrowser'
                    }
                ]
            }
        },
        svgmin: {
            options: {
                plugins: [
                    { removeViewBox: true },
                    { removeUselessStrokeAndFill: true },
                    { removeEmptyAttrs: true },
                    { collapseGroups: true },
                    { minifyStyles: true },
                    { removeMetadata: true },
                    { removeTitle: true },
                    { removeUnkownsAndDefaults: true },
                    { removeUselessDefs: true },
                    { removeUselessStrokeAndFill: true }
                ]
            },
            target: {
                files: [
                    { expand: true, cwd: '../build', src: ['**/*.svg'], dest: '../build/' }
                ]
            }
        }
    });

    // Remove old files
    grunt.registerTask('remove_old_files', 'Remove old files', function () {
        var done = this.async();
        rm('../build/*', done);
    });

    // Clean temporaries done for the build
    grunt.registerTask('clean_build', 'Clean temporaries', function () {
        fs.existsSync('../build/app.scss') && fs.unlinkSync('../build/app.scss');
        fs.existsSync('../build/app.css.diff') && fs.unlinkSync('../build/app.css.diff');
    });

    // The task...
    grunt.registerTask('build',
       isProd ? ['remove_old_files', 'webpack',<% if (!!tech.sass) { %> 'sass_globbing', 'sass',<% } %><% if (!!tech.autoprefixer) { %> 'autoprefixer',<% } %>
                 <% if (!!tech.rem) { %>'pixrem', <% } %>'cssmin', 'uglify', 'copy',<% if (!!tech.svg) { %>'svgmin',<% } %>
                 'clean_build']
       : ['remove_old_files', 'webpack',<% if (!!tech.sass) { %> 'sass_globbing', 'sass',<% } %>
          'copy',
          'clean_build']
   );
};
