const { env } = require('./env.config');
const fs = require('fs');
const { resolve } = require('path');

const optPath = resolve(__dirname, '../certs', `${env}`);

const httpsOpt = {
  key: fs.readFileSync(`${optPath}/server.key`),
  cert: fs.readFileSync(`${optPath}/server.crt`)
}


module.exports = httpsOpt;
