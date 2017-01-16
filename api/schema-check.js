const {needCheckPropery} = require('./api.config')
const {isEmpty} = require('../utils/util');
const {needCheckProperty} = require('./api.config');

const apiDefCheck = function (apiDef = {}) {
    needCheckPropery.forEach(prop=>{
        if(isEmpty(apiDef[prop])){
            throw new Error(`---->api.config.js:${def} propery in IFsDes required<----`);
        }
    })
}

module.exports = {
    apiDefCheck
}