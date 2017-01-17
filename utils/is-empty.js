const isEmpty = function(obj){
  if(!obj){
    /* null,undefined,NaN,'',0 
     * above values are treated EMPTY
     */
    return true;
  }else if(Array.isArray(obj) && 0 === obj.length){
    return true;
  }else if(Object.prototype.toString(obj) === '[object Object]'){
    // WARN: only deal with plain object now
    return JSON.stringify(obj) === '{}';
  }
};

module.exports = isEmpty;
