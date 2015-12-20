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
        path: path.resolve(__dirname, 'build'),
        filename: '[chunkhash].js',
        chunkFilename: '[chunkhash].js',
        publicPath: './'
    },
    resolve: {
        root: [
            path.resolve(__dirname, 'app')
        ],
        modulesDirectories: [ 'node_modules' ],
        extensions: [ '', '.js', '.jsx' ],
        alias: {
            react$: 'react/addons'
        }
    },
    module: {
        //preLoaders: [
        //    { test: /\.jsx?$/, include: path.resolve(__dirname, 'app'), loader: 'eslint' }
        //],
        loaders: [
            { test: /\.jsx?$/i, include: [ path.resolve(__dirname, 'app') ], loader: 'babel?presets[]=es2015,presets[]=react' },
            { test: /\.s?css$/i, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?{browsers:["last 2 version","safari 5","ie 8","ie 9","opera 12.1"]}!sass?outputStyle=expanded') },
            { test: /\.(?:eot|ttf|woff\d?|otf)$/i, loader: 'file' },
            { test: /\.(?:jpe?g|png|gif|svg)$/i, loader: 'url?limit=' + 1024 },
            { test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery' },
            { test: require.resolve('./app/utils/vendor/modernizr'), loader: 'file?name=[name].[ext]' }
        ],
        noParse: /modernizr\.js$/i
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        //new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new webpack.IgnorePlugin(/\.ico$/),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactIntl: 'react-intl',
            Intl: 'intl'
            //jQuery: 'jquery',
            //$: 'jquery',
            //_: 'lodash'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: cfg.env === 'prd' ? '"production"' : '"development"'
            }
        }),
        new HtmlWebpackPlugin({
            title: pkg._title,
            favicon: 'static/assets/images/favicon.ico',
            template: 'app/index.html'
        }),
        new ExtractTextPlugin('[contenthash].css')
    ]
};
