const crypto = require('crypto');
const fs = require('fs');

module.exports = {
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