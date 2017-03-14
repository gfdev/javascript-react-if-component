'use strict';

var pkg = require('./package.json')
    , webpack = require('webpack')
;

module.exports = {
    context: __dirname + '/src',
    devtool: 'source-map',
    entry: '../index.js',
    output: {
        path: __dirname + '/dist',
        filename: pkg.name + '.min.js',
        sourceMapFilename: pkg.name + '.min.js.map',
        library: pkg._lib,
        libraryTarget: pkg._libTarget
    },
    externals: {
        react: {
            amd: 'react',
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react'
        }
    },
    module: {
        loaders: [
            { test: /\.js$/, include: __dirname, loader: 'babel?cacheDirectory' }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};
