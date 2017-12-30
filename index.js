
module.exports = function () {
  var buffer = [], ended
  function next (cb) {
    if(buffer.length) cb(null, buffer.shift())
    else if(ended) cb(ended)
    else throw new Error('expected ended')
  }
  return function (read) {
    return function (abort, cb) {
      var sync = true
      while(sync) {
        sync = false
        read(abort, function (end, data) {
          if(!(ended = ended || end)) buffer.push(data)
          if(sync || ended) next(cb)
          else sync = true
        })
      }
      sync = true
      if(buffer.length) next(cb)
    }
  }
}








