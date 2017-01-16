const setifyAndGetify = class {
  constructor(state={}){
    
    const self = this;

    self._state = state;
   
    // TODO: make state nested observable;
    Object.keys(state).forEach(key=>{
      // init key value change event fn array
      self[`_on${key}`] = [];

      // transform state properties to getters and setters
      Object.defineProperty(self, key, {
        get: ()=>state[key],
        set: value=>{
          const oldVal = state[key];
          state[key] = value;

          // trigger the change event callbacks
          self[`_on${key}`].forEach(fn=>fn.call(self,oldVal,value));
        },
        enumerable: true,
        configurable: false
      })
    })
  }

  on(keyname,fn){
    if(typeof keyname  !== 'string' || !keyname){
      throw new Error('to watch change,you must give the property name in a string which must NOT be empty');
    }

    // if fn is NOT valid, an empty one will be provided
    if(typeof fn === 'function'){
      this[`_on${keyname}`].push(fn);
    }
  }

  off(keyname,fn){
    if(typeof keyname  !== 'string' || !keyname){
      return;
    }
    
    if(typeof fn === 'function'){
      const arr = this[`_on${keyname}`];
      const index = arr.indexOf(fn);
      index >= 0 && arr.splice(index,1);
    }
  }
}


module.exports = setifyAndGetify;