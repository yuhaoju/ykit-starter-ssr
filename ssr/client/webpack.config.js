const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const appRoot = path.join(__dirname, '../../');

module.exports = {
    context: path.join(appRoot, 'ssr/client'),
    entry: {
        app: './index.js'
    },
    output: {
        path: path.join(appRoot, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/',
        chunkFilename: '[name].bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true)
            }
        })
    ]
}
