var path = require('path')
    , pkg = require('./package.json')
    , webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
;

module.exports = {
    context: __dirname,
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './src/demo/index'
    ],
    devServer: {
        contentBase: './',
        historyApiFallback: true,
        host: '0.0.0.0',
        hot: true,
        port: 3000,
        stats: {
            colors: true
        }
    },
    output: {
        filename: '[name].js'
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
            { test: /\.jsx?$/, include: [ path.resolve(__dirname, 'src') ], loader: 'react-hot!babel' },
            { test: /\.s?css$/i, loader: 'style!css!autoprefixer?{browsers:["last 2 version"]}!sass' },
            { test: /\.(?:jpe?g|png|gif|svg|eot|ttf|woff\d?|otf)$/, loader: 'url?limit=' + 1024 * 1024 * 10 }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        new HtmlWebpackPlugin({
            title: pkg._title,
            template: 'src/demo/index.html',
            inject: 'body'
        })
    ]
};
