var pkg = require('./package.json')
    , webpack = require('webpack')
;

module.exports = {
    context: __dirname + '/src',
    entry: '../index.js',
    output: {
        path: __dirname + '/dist',
        filename: pkg.name + '.min.js',
        sourceMapFilename: pkg.name + '.min.js.map',
        library: 'ReactIf',
        libraryTarget: 'umd'
    },
    externals: {
        'react': {
            'commonjs': 'react',
            'commonjs2': 'react',
            'amd': 'react',
            'root': 'React'
        }
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory' }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
};
