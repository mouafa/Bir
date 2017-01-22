import test from 'ava'
var bus = require('../src')

test('test general use', t => {
    var x = 0
    bus.on('test', () => x = 2)
    bus.on('test', () => x = x*2)
    bus.emit('test')
    t.is(x, 4)
    //t.pass();
})

test('test once use', t => {
    var x = 0
    bus.once('test', () => x = ++x)
    bus.emit('test')
    bus.emit('test')
    t.is(x, 1)
    //t.pass();
})