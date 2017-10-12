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
        publicPath: '/',
        chunkFilename: '[name].bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                query: {
                    presets: [
                        'es2015', 'stage-0', 'react'
                    ]
                }
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
