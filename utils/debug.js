const {env} = require('../global.config');

const debug = function (name) {
    return function (info) {
        'development' === env ? (function(){
            console.error(`---->${name}<----`);
            console.log(info);
        })() : null;
    }
}


module.exports = debug;