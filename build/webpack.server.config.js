const path = require('path');
const { merge } = require('webpack-merge');
const WebpackNodeExternal = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config');
const config = require('./config');

const serverConfig = {
    mode: process.env.NODE_ENV,
    target: 'node',
    entry: {
        server: './src/server/server-entry.js'
    },
    output: {
        filename: 'js/[name].js',
        libraryTarget: 'commonjs2'
    },

    externals: [WebpackNodeExternal()]
};

module.exports = merge(baseConfig(config[process.env.NODE_ENV]), serverConfig);
