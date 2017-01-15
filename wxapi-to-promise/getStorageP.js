const debug = require('../utils/index').debug('getStorage');

const getStorageP = function (key) {
    if ('string' !== typeof key || !key) {
        throw new Error('key MUST be a string type can can NOT be empty');
    }

    return new Promise((resolve, reject) => {
        wx.getStorage({
            key: 'String',
            success: function (res) {
                // success
                resolve(res);
            },
            fail: function (err) {
                // fail
                reject(err);
            },
            complete: function () {
                // complete
                debug(`you tried getStorageP with key: ${key}`);
            }
        })
            .catch(err => {
                console.error(`---->${err.message}<----`);
                console.error(`====>stack trace<==== ${err.stack}`);
                return;
            })
    })
}