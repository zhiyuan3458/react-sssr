const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const config = require('./config');
const { resolve } = require('./utils');

const clientConfig = {
    mode: process.env.NODE_ENV,
    entry: {
        /** 都写成这样子了，以根目录为基础 */
        client: './src/client/client-entry.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'server.tpl.html'
        }),
        new FriendlyErrorsPlugin()
    ]
};

module.exports = merge(baseConfig(config[process.env.NODE_ENV]), clientConfig);
