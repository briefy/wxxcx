const debug = require('debug')('httpTohttps');
const { serverPort: { httpsPort } } = require('../../config');

module.exports = function(opt = {}) {
  /* httpsMaxAge can be set to a small amount of time,
   * However,recommend to set a long time to perform a strict transport security,
   * example, httpsMaxAge= 31536000,which is an a-year time;
   */
  const { httpsOnly = true, httpsMaxAge = 600 } = opt;

  return function*(next) {
    if (this.protocol === 'http' && httpsOnly) {
      const url = `https://${this.hostname}:${httpsPort}${this.originalUrl}`;
      this.redirect(url);
      this.status = 301;
      debug(`${this.status} redirect HTTP ${this.request.href} to HTTPS ${url}`);
      return;
    } else if (this.protocol === 'https' && httpsOnly) {
      // if httpsOnly server,enforce https requests by STS
      this.set('Strict-Transport-Security', `max-age=${ httpsMaxAge };includeSubDomains`);
      debug('httpsOnly,set STS max-age: %s', httpsMaxAge);
    }

    yield next;
  }
}
