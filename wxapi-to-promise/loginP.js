const debug = require('../utils/index').debug('loginP');

const loginP = function () {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res) {
                // res.code indicates that whether login succeeded or not
                if (res.code) {
                    resolve(res.code);
                    debug(`login succeeds---->code: ${res.code};errMsg: ${res.errMsg}`);
                } else {
                    reject(res.errMsg);
                }
            },
            fail(err) {
                // TODO: find out how to use this fail callback
                reject(err);
            },
            compelete() {
                debug('you tried login');
            }
        })
            // err handling 
            .cathc(err => {
                // TODO: what will fail reject ?
                if (err instanceof Error) {
                    console.error(`---->${err.message}<----`);
                    console.error(`====>stack trace<==== ${err.stack}`);
                    return;
                }
                
                debug(`login failed---->errMsg: ${err}`);
            })
    })
};

module.exports = loginP;