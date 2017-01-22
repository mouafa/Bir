import test from 'ava'
var bus = require('../src')

test('test general use', t => {
    var x = 0
    bus.on('test', () => x = 4)
    bus.emit('test')
    t.is(x, 4)
    //t.pass();
})
