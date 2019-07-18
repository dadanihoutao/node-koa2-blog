const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(commonConfig, {
    entry: {
        app: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        filename: '[name].[hash].js',
    },
    // 模式 当前环境
    mode: 'development',
    // 调试工具
    devtool: 'inline-source-map',
    // 本地服务
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),// 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        // contentBase: false,
        historyApiFallback: true,// 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        compress: true,// 启用gzip压缩
        inline: true,// 设置为true，当源文件改变时会自动刷新页面
        hot: true,// 模块热更新，取决于HotModuleReplacementPlugin
        host: '127.0.0.1',// 设置默认监听域名，如果省略，默认为“localhost”
        port: 9000// 设置默认监听端口，如果省略，默认为“8080”
    },
    plugins: [
        // 热更新相关
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        nodeEnv: 'development'
    }
})