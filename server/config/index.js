const { env } = require('./env.config');
const httpsOpt = require('./cert.config');
const serverPort = require('./server-port.config');
const proxyConfig = require('./proxy.config');

module.exports = {
  env, // 变量环境
  httpsOpt, // https服务器配置
  serverPort, // 服务器端口号
  proxyConfig
};
