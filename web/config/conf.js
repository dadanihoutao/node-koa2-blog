/**
 * 项目不同环境配置文件
 */
let configObject = {}
const env = process.env.NODE_ENV;
if (env === 'development') {
    configObject = {
        mode: 'hash'
    }
} else if (env === 'testing') {
    configObject = {
        mode: 'history'
    }
} else if (env === 'production') {
    configObject = {
        mode: 'history'
    }
}
export default configObject;