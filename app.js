//app.js
const promisifyAPI = require('./wxapi-to-promise/index');
const globalData = require('./runtime/global-data');
const PageProxy = require('./runtime/page-proxy');
const debug = require('./utils/index').debug('app.js');
const IF = require('./api/index');

App({
  globalData,
  onLaunch: function () {
    // init promisified api
    promisifyAPI();

    // proxy Page
    wx.Page = Page;
    Page = PageProxy;

    // hook api interfaces
    wx.IF = IF;

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },

  // lifecycle hooks 
  // onShow() {
  //   debug('app onShow');
  // },
  // onHide() {
  //   debug('app onHide');
  // },
  onError(err) {
    debug(err);
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })

    }
  }
})