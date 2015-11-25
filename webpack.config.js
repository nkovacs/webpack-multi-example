var webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: './build',
        publicPath: 'build/',
        filename: 'build.js'
    },
    module: {
        loaders: []
    }
}
