// 设置代理
module.exports = {
    '/api': {
        target: 'http://192.168.0.104:3001',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
    }
}