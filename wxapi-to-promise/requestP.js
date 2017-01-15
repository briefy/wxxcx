const requestP = function (option = {}) {
    // url is required,can NOT be missing
    if(!option.url){
        throw new Error('url can NOT be missing');
    }
    
    // WARN: NO fn parameters,eg. arguments.length === 0
    const beforeReqSend =  option.beforeReqSend || function(){};

    return new Promise((resolve, reject) => {
        option.success = function (data) {
            resolve(data);
        };
        option.fail = function (err) {
            reject(err);
        };

        // complete callback WONT be in use now
        option.complete = function(){};

        // beforeReqSend callback
        beforeReqSend();

        // send the request
        wx.request(option);
    })
        // err handling for request 
        .then(data => {
            /* if data code returned from api is NOT 0,
             * ERROR handling below.
             */
            if (data.code !== 0) {
               throw data;
            }

            return data;
        })
        .catch(err=>{
            // process error rejected above;
            if(err instanceof Error){
                console.error(`---->${err.message}<----`);
                console.error(`====>stack trace<==== ${err.stack}`);
                return;
            }

            /* process api returned error code,
             * {
             *   code,
             *   message
             * }
             */
            console.error('api retruned ERROR: %s:%s',err.code,err.message);
        })
}

module.exports = requestP;