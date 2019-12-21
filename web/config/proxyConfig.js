// 设置代理
module.exports = {
    '/api': {
        target: 'http://192.168.0.103:3001',   // 修改成自己本地的ip地址
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
    }
}