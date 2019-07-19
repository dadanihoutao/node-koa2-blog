const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        filename: 'js/[name].[chunkhash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: "./"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,// 屏蔽不需要处理的文件（文件夹）（可选）
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
          verbose: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'),
            // inject: 'body'
        })
    ],
    // 代码分离相关
    optimization: {
        nodeEnv: 'production',
        minimizer: [new UglifyjsWebpackPlugin()],
        runtimeChunk: {
            name: 'manifest'
        },
    splitChunks: {
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'initial',
                }
            }
        }
    }
}