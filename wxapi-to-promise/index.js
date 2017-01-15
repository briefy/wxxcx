const requestP = require('./requestP');
const loginP = require('./loginP');
const setStorageP = require('./setStorageP');
const getStorageP = require('./getStorageP');

// hook promisified api on wx
module.exports = function () {
    if(undefined === Promise){
        alert('Promise polyfill should be provided');
        throw new Error('Promise polyfill should be provided');
    }
    wx.requestP = requestP;
    wx.loginP = loginP;
    wx.setStorageP = setStorageP;
    wx.getStorageP = getStorageP;
};