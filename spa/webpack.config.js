var path = require('path');
var webpack = require('webpack');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('shared.js');

module.exports = {
    context: path.resolve('scripts'),
    entry: {
        frontend: './app.js',
        backend: './adminApp.js'
    },
    output: {
        path: path.resolve('public/assets/js'),
        filename: "[name].js"
    },
    plugins: [commonsPlugin],
    devServer: {
        contentBase: 'public'
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                loader: "file-loader"
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
    }
};