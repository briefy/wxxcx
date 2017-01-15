const debug = require('../utils/index').debug('setStorageP');

const setStorageP = function(option = {}){
    // option guardian
    if(!option.key||!option.data){
        throw new Error(`---->key or data can NOT be missing<----`);
    }

    return new Promise((resolve,reject)=>{
        wx.setStorage({
          key: option.key,
          data: option.data,
          success: function(res){
            // success
            resolve(res);
            debug(`${res}`);
          },
          fail: function() {
            // fail
            debug('setStorageP failed');
          },
          complete: function() {
            // complete
            debug('you tried setStorageP with key: ${option.key}');
          }
        })
    });
};

module.exports = setStorageP;
