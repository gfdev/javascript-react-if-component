var path = require('path')
    , pkg = require('./package.json')
    , webpack = require('webpack')
;

module.exports = {
    context: __dirname,
    entry: {
        'example': './src/example.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.js$/, include: path.resolve(__dirname, 'src'), loader: 'babel' }
        ]
    }
};
