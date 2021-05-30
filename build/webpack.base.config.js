const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('./utils');

module.exports = (config) => {
    return {
        output: {
            path: resolve('dist'),
            publicPath: config.publicPath,
            filename: 'js/[name].[hash:8].js'
        },
        resolve: {
            alias: {
                src: resolve('src')
            },
            extensions: ['.js', '.less']
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    loader: 'babel-loader',
                    exclude: /node_moudles/
                },
                {
                    test: /\.less/,
                    include: /src/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        },
                        /* less-loader不能太高版本,这里版本是 */
                        /* "less": "^3.9.0" */
                        /* "less-loader": "^4.1.0" */
                        'less-loader'
                    ]
                }
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name].[hash:8].css'
            })
        ]
    };
};
