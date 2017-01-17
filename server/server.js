const https = require('https');
const http = require('http');
const fs = require('fs');
const debug = require('debug')('server')
const app = require('./src/app');
const {
  httpsOpt,
  serverPort
} = require('./config');

// create a HTTPS server
try {
  https.createServer(httpsOpt, app.callback()).listen(serverPort.httpsPort, function() {
    console.log(`YOU ARE LISTENING ON https PPORT:${this.address().port}`);
  }).on('request', (req, res) => {
    let ip = '';
    debug('REQUEST from %s at %s by method %s in httpVersion', ip, new Date, req.method, req.httpVersion);
  });
} catch (err) {
  console.log(err.message);
}
// create a HTTP server
try {
  http.createServer(app.callback()).listen(serverPort.httpPort, function() {
    console.log(`YOU ARE LISTENING ON http PPORT:${this.address().port}`);
  }).on('request', (req, res) => {
    let ip = '';
    debug('REQUEST from %s at %s by method %s in httpVersion', ip, new Date, req.method, req.httpVersion);
  });
} catch (err) {
  console.log(err.mesage);
}
