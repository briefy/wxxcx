const {env} = require('../global.config');

const debug = function (name) {
    return function (info) {
        'develepment' === env ? (function(){
            console.log(`---->${name}<----`);
            console.log(info);
        })() : null;
    }
}


module.exports = debug;