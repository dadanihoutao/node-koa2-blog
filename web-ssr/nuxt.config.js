const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '哼哼嘻的博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' }, // iOS浏览器禁止缩放
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: '哼哼嘻的博客，个人博客，前端技术，html，css，javascript，es6789，react.js，vue.js，webpack，node.js，koa2.js，小程序' },
      { hid: 'description', name: 'description', content: '专注前端技术，html，css，javascript，es6789，react.js，vue.js，webpack，node.js，koa2.js，小程序等相关技术' },
      { name: 'renderer', content: 'webkit' }, // 强制让360浏览器使用Webkit内核
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#39f' },
  /*
  ** Global CSS
  */
  css: [
    'iview/dist/styles/iview.css',
    'mavon-editor/dist/css/index.css',
    'assets/less/index.less',
    'assets/font/iconfont.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '@/plugins/route', ssr: true},
    {src: '@/plugins/iview', ssr: true},
    {src: '@/plugins/common', ssr: true},
    {src: '@/plugins/lockr', ssr: true},
    {src: '@/plugins/axios', ssr: true},
    {src: '@/plugins/vuescroll', ssr: true},
    {src: '@/plugins/mavoneditor', ssr: false}
  ],
  route: {
    extendRoutes (routes, resolve) {
        routes.push({
            name: 'article',
            path: '/',
            component: resolve(__dirname, 'pages/article/index.vue')
        })    
    }
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://192.168.0.104:3001',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // extend (config, ctx) {
    // },
    extend (config, { isDev, isClient }) {
        // if (isDev && isClient) {
        //   config.module.rules.push({
        //     enforce: 'pre',
        //     test: /\.(js|vue)$/,
        //     loader: 'eslint-loader',
        //     exclude: /(node_modules)/
        //   })
        // }
    },
    // 开启webpack打包解析文件大小插件（webpack-bundle-analyze）
    // analyze: true,
    vendor: ['axios'], // 为防止重复打包
    optimization: { // 配置代码压缩规则
        minimizer: [
            // webpack4 使用的压缩插件，用来替代webpack3的 UglifyJsPlugin
            new TerserPlugin({
                terserOptions: {
                warnings: false,
                compress: {
                    drop_console: true, // 可选：false,生产移除 console.log
                    pure_funcs: ['console.log']
                },
                output: {
                    // 是否保留代码注释
                    comments: false
                },
                cache: true,
                parallel: true,
                // Must be set to true if using source-maps in production
                sourceMap: process.env.NODE_ENV !== 'production'
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '.',
            maxAsyncRequests: 7,
            cacheGroups: {
                iview: {
                    test: /node_modules[\\/]iview/,
                    chunks: 'all',
                    priority: 18,
                    name: true
                },
                lodash: {
                    test: /node_modules[\\/]lodash/,
                    chunks: 'all',
                    priority: 18,
                    name: true
                }
            }
        }
    }
  }
}
