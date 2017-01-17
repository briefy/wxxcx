const debug = require('debug')('exception');

module.exports = function() {
  /* default error code is 1,
   * throw specific code in err below to overwrite this
   */
  let code = 1;

  return function*(next) {
    try {
      yield next;
    } catch (err) {
      debug(`---->ERROR occurred ${err.name}:${err.message},at ${new Date}<----`);
      debug(`====> stack trace:<==== ${err.stack}`);
      this.status = 200;
      this.body = {
        code: err.code,
        message: err.message || ERROR_TYPE[err.code] || `api interface error ocurred`
      };
    }
  }
}


const ERROR_TYPE = {
  [1]: 'api error'
}
