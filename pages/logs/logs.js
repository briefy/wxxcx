//logs.js
var {formatTime} = require('../../utils/index');
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return formatTime(new Date(log))
      })
    })
  }
})



function onSocketMessage(){
   let wss = new Promise((resolve,reject)=>{
      wx.onSocketMessage(res=> resolve(res));
   })
   return wss;
}
