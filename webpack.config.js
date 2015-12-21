var path = require('path')
    , cfg = require('./app/config.json')
    , pkg = require('./package.json')
    , webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , ExtractTextPlugin = require('extract-text-webpack-plugin')
    , CleanWebpackPlugin = require('clean-webpack-plugin')
;

module.exports = {
    context: __dirname,
    entry: {
        app: './app/main'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[chunkhash].js',
        chunkFilename: '[chunkhash].js',
        publicPath: './'
    },
    resolve: {
        root: [
            path.resolve(__dirname, 'src')
        ],
        modulesDirectories: [ 'node_modules' ],
        extensions: [ '', '.js', '.jsx' ]
    },
    module: {
        preLoaders: [
            { test: /\.jsx?$/, include: path.resolve(__dirname, 'src'), loader: 'eslint' }
        ],
        loaders: [
            { test: /\.jsx?$/i, include: [ path.resolve(__dirname, 'src') ], loader: 'babel' },
            { test: /\.s?css$/i, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?{browsers:["last 2 version"]}!sass?outputStyle=expanded') },
            { test: /\.(?:eot|ttf|woff\d?|otf)$/i, loader: 'file' },
            { test: /\.(?:jpe?g|png|gif|svg)$/i, loader: 'url?limit=' + 1024 }
        ],
        noParse: /modernizr\.js$/i
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        //new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: cfg.env === 'prd' ? '"production"' : '"development"'
            }
        }),
        new HtmlWebpackPlugin({
            title: pkg._title,
            template: 'src/demo/index.html'
        }),
        new ExtractTextPlugin('[contenthash].css')
    ]
};
