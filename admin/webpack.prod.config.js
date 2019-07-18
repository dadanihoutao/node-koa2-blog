const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(commonConfig, {
    // 模式，生产环境
    mode: 'production',
    // 生产环境调试工具
    devtool: '#source-map',
    // 输出
    // output: {
    //     path: path.resolve(__dirname, './dist'),
    //     filename: "js/[name].[chunkhash].js",
    //     publicPath: "/"
    // },
    // 插件
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
        }),
        new webpack.HashedModuleIdsPlugin(),
    ]
})