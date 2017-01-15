const merge  = function merge(to = {},...froms){
  froms.forEach(from=>{
    Object.keys(from).forEach(key=>{
      typeof from[key] === 'object' ? to[key] = merge(to[key],form[key]) : to[key] = from[key];
    })
  });

  return to;
}