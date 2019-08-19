const crypto = require('crypto');
const fs = require('fs');

module.exports = {
    // md5 加密方法封装
    md5 (buffer) {
        let obj = crypto.createHash('md5');
        obj.update(buffer);
        return obj.digest('hex');
    },
    unlink (path) {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                }
            })
        })
    },
    // 接口返回数据方法封装
    handleResulte (code, data, msg, page, token) {
        if (page) {
            return { code, data, msg, page }
        }
        if (token) {
            return { code, data, msg, token}
        }
        return { code, data, msg }
    }
}