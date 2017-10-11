var path = require('path');
const appRoot = path.join(__dirname, '../');

module.exports = {
    context: path.join(appRoot, 'src'),
    entry: './index.js',
    output: {
        path: path.join(appRoot, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
}
