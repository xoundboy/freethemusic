var path = require('path');
var webpack = require('webpack');
require('es6-promise').polyfill();

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('shared.js');
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});

module.exports = {
    context: path.resolve('scripts'),
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve('public/assets/js'),
        filename: "[name].js"
    },

    // TODO - uglify plugin should be enabled in production but has
    // been disabled for development as it prevents Chrome dev tools
    // debugger from working properly
    plugins: [commonsPlugin/*, uglifyPlugin*/],
    devServer: {
        contentBase: 'public'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: "url-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader!sass-loader"
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'jshint-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    devtool: "source-map"
};