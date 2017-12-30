# pull-sync-buffer

a stream that synchronously buffers as much as it can before allowing read.

for example, consider the following stream.

``` js
var SyncBuffer = require('pull-sync-buffer')

pull(
  pull.values([1,2,3]),
  pull.through(function (e) { console.log('A:', e) }),
  //SyncBuffer(),
  pull.through(function (e) { console.log('B:', e) }),
  pull.drain()
)
```
the output we'd expect from a pull-stream would be

```
A: 1
B: 1
A: 2
B: 2
A: 3
B: 3
```
but if we uncomment `//SyncBuffer(),`
the output will look like

``` js
A: 1
A: 2
A: 3
B: 1
B: 2
B: 3
```

## Motivation

you generally don't want a pull-stream which behaves like this,
but muxrpc does (until I fix it) so I needed this to test ssb-ebt until then.

## License

MIT




