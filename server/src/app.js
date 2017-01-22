const koa = require('koa');
const { throwErr } = require('../utils');

const { proxyConfig } = require('../config');

// self middlewares required below
const httpTohttps = require('./middlewares/httpTohttps');
const responseTime = require('./middlewares/responseTime');
const expHandle = require('./middlewares/exception');
const proxy = require('./middlewares/proxy');

const app = new koa();

// Exception processs,must be on the topest
app.use(expHandle());

// server responseTime
app.use(responseTime());

//　set httpsOnly to TRUE to make it https only
app.use(httpTohttps({
  httpOnly: false
}));

app.use(proxy(proxyConfig));

app.use(function*() {
  this.status = 200;
  this.message = 'https request';
  throwErr();
});



module.exports = app;
