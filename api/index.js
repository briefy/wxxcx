const {apiHost} = require('../global.config');
const {IFsDesc} = require('./api.config');
const {apiDefCheck} = require('./schema-check');
const requestP = require('../wxapi-to-promise/requestP');

// api interface
const IF = {};

const IFSuccessCallback = {};
const IFSuccessCallbackOnce = {};

IFsDesc.forEach((api) => {
    // IFsDesc parameters check
    apiDefCheck(api);

    let apiNameArray = api.url
        .replace(/^\//, '')
        .split('/')
        .map((path, index) => {
            // api name is small camelCase
            if (0 === index) {
                return path;
            }
            return path.replace(/^\w{1}/, path[0].toUpperCase());
        });
    apiNameArray.push(api.method);
    let apiName = apiNameArray.join('');

    let url = api.url;
    let method = api.method;
    let dataType = api.dataType || 'json';

    // deploy interface
    IF[apiName] = function (data = {}) {
        // TODO: determine if in GET,querystring can be put in data
        return requestP({
            url,
            method,
            data,
            dataType,
            header: {
                // TODO: make sure this works under all circumstances
                'content-type': 'application/json'
            }
        })
            // call the success callbacks
            .then(data => {
                // TODO: find if callbacks can be executed in web worker or something alike
                IFSuccessCallback[apiName].forEach(o => {
                    const fn = o['fn'];
                    const ctx = o['ctx'];
                    fn(ctx);
                });

                // must be returned,so that can be process by successive then callbacks
                return data;
            });
    };

    // name the api 
    // IF[apiName]['name'] = apiName;

    // init api success callback
    IFSuccessCallback[apiName] = [];
    IFSuccessCallbackOnce[apiName] = [];

    /* 'fn' is the callback
     * 'ctx' will be passed to the first parameter of 'fn' 
     * 
     * WARN: fn can NOT be array now,but can be called in chain
     * 
     * 'fn' will be called whenever the api returns 
     */
    IF[apiName].regSuccessCallback = function (fn, ctx = {}) {
        if (typeof fn !== 'function') {
            throw new Error(`callback for ${apiName} should be a function`);
        }

        IFSuccessCallback[apiName].push({ fn, ctx });

        return this;
    }
    
    // once only callback
    IF[apiName].regSuccessCallbackOnce = function (fn, ctx = {}) {
        // TODO: once callbacks are not called yet,needs to be implemented if needed
        if (typeof fn !== 'function') {
            throw new Error(`callbackOnce for ${apiName} should be a function`);
        }

        IFSuccessCallback[apiName].push({ fn, ctx });
    }
})


module.exports = IF;



