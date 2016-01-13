var path = require('path')
    , pkg = require('./package.json')
    , webpack = require('webpack')
;

module.exports = {
    entry: './index',
    output: {
        filename: './dist/' + pkg.name + '.js',
        sourceMapFilename: './dist/' + pkg.name + '.js.map',
        //devtoolModuleFilenameTemplate: '../[resource-path]',
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
            { test: /\.js$/, include: path.resolve(__dirname, 'src'), loader: 'babel?cacheDirectory' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: []
};
