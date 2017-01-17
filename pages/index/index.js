//index.js
//获取应用实例
var app = getApp();

Page({
  data:{
      motto: 'Hello World',
      userInfo: { nickName: 'jfdaksljdfkal' },
      p: 0
    },
      //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    });

  },
  onLoad() {
    async function x() {
      let ret = await wx.requestP({
        url: 'http://10.15.0.175',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      });
      return ret;
    }
    x();


    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: { nickName: 'briefy' }
      })
    })
  }
})
