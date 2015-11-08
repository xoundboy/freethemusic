var path = require('path');

var CommonsChunkPlugin = require("./node_modules/webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        public: "./app",
        admin: "./adminApp"
    },
    output: {
        path: path.join(__dirname, "js"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    plugins: [
        new CommonsChunkPlugin("commons.js")
    ],
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
}