const httpProxy = require('http-proxy');
const { httpsOpt } = require('../../config');

module.exports = function(opts = []) {
  const proxy = httpProxy.createProxyServer({});
  return function*(next) {
    const url = this.url;
    let index = 0;
    let prefix = '';
    let map = '';

    if (opts.some((opt, i) => {
        prefix = opt.prefix;
        if (url.startsWith(`/${prefix}`)) {
          index = i;
          map = opt.map;
          return true;
        }
      })) {
      proxy.web(this.req, this.res, {
        target: opts.target,
        ssl: httpsOpt,
        secure: opts.target.starsWith('https') ? true : false
      });

      // remove the prefix
      proxy.on('proxyReq', function(req) {
        const url = req.url;
        if (map) {
          const i = url.indexOf('?');
          req.url = `${map}${url.slice(i)}`;
        } else {
          req.url = url.replace(`/${prefix}`, '');
        }
      });
    } else {
      yield next;
    }
  }
}
