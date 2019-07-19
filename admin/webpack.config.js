const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[hash].js',
    publicPath: "/"
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,// 屏蔽不需要处理的文件（文件夹）（可选）
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(css|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: [path.resolve(process.cwd(), "build/"), path.resolve(process.cwd(), "dist/")]
    // }),
    new HtmlWebpackPlugin({
        filename: 'index.html', //要将HTML写入的文件。默认为index.html
        template: path.resolve(__dirname, 'src/index.html'), //webpack模板的相对或绝对路径。默认情况下，src/index.ejs
        // showErrors: true, //错误详细信息将写入HTML页面
        minify: { // 压缩HTML文件
          removeComments: true, // 移除HTML中的注释
          collapseWhitespace: true, // 删除空白符与换行符
          minifyCSS: true// 压缩内联css
        },
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),// 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
    historyApiFallback: true,// 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    compress: true,// 启用gzip压缩
    inline: true,// 设置为true，当源文件改变时会自动刷新页面
    hot: true,// 模块热更新，取决于HotModuleReplacementPlugin
    host: '127.0.0.1',// 设置默认监听域名，如果省略，默认为“localhost”
    port: 9000// 设置默认监听端口，如果省略，默认为“8080”
  },
  optimization: {
    moduleIds: 'hashed',
     runtimeChunk: 'single',
     splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all'
         }
       }
     }
  }
}