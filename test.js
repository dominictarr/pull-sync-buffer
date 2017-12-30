
var tape = require('tape')
var pull = require('pull-stream')

tape('simple', function (t) {
  var sum = 0, sum2 = 0
  pull(
    pull.values([1,2,3]),
    pull.through(function (e) {
      console.log('b', e)
      sum += e
    }),
    require('./')(),
    pull.drain(function (e) {
      t.equal(sum, 6)
      sum2 += e
    }, function () {
      t.equal(sum2, sum)
      t.end()
    })
  )
})
