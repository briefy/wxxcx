const pageCommon = require('./page-common');
const {merge} = require('../utils/index');
const onFns = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom'];

const PageProxy = function (config) {
  const pageConfig = merge(pageConfig, pageCommon, config);
  onFns.forEach(onFn => {
    pageConfig[onFn] = function () {
      // this should be bound
      pageCommon[onFn].call(this);
      config[onFn] && config[onFn].call(this);
    };
  });

  wx.Page(pageConfig);
}

 module.exports= PageProxy;
 