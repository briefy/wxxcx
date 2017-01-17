//app.js
const promisifyAPI = require('./wxapi-to-promise/index');
const globalData = require('./runtime/global-data');
const IF = require('./api/index');
let PageProxy = require('./runtime/page-proxy');

App({
  globalData,
  onLaunch: function () {
    // init promisified api
    promisifyAPI();

    // proxy Page
    wx.Page = Page;
    Page = PageProxy;

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login(function () {
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })

      })

    }
  }
})