const pageCommon = require('./page-common');
const {merge} = require('../utils/index');
const onFns = ['onLoad','onReady','onShow','onHide','onUnload','onPullDownRefresh','onReachBottom'];
const PageConfig = {}

wx.Page = Page || function(){
  console.error('There is no Page call');
};

PageProxy = function(config){
    PageConfig = merge(PageConfig,PageCommon,config);
    onFns.forEach(onFn=>{
      pageConfig[onFn] = function(){
        pageCommon[onFn]();
        config[onFn]();
      };
    });

    wx.Page(pageConfig);
}

module.exports = PageProxy;