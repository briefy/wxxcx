const throwErr = function(code = 1, message = '') {
  const err = new Error;
  err.code = code;
  err.message = message;
  throw err;
}

module.exports = { throwErr };
