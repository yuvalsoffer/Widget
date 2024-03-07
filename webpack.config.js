const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const bundleOutputDir = './dist';

module.exports = (env) => {
    return [{
        entry: './src/main.js',
        output: {
            filename: 'widget.js',
            path: path.resolve(bundleOutputDir),
        },
        devServer: {
            static: bundleOutputDir
        },
        plugins: [new webpack.SourceMapDevToolPlugin(), new copyWebpackPlugin({ patterns: [{ from: 'demo/' }] })],
        mode: 'none',
        module: {
            rules: [
                {
                    test: /\.js$/i, exclude: /node_modules/, use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/env', {
                                'targets': {
                                    'browsers': ['IE 11, last 2 versions']
                                }
                            }]]
                        }
                    }
                },
                { test: /\.html$/i, use: 'html-loader' },
                {
                    test: /\.css$/i, use: ['style-loader', 'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer(),
                                    postcssPresetEnv({
                                        stage: 3,
                                        features: {
                                            'nesting-rules': true // If you want to enable nesting rules
                                            // Other features you may need
                                        }
                                    })
                                ]
                            }
                        }
                    }]
                },
            ]
        }
    }];
};