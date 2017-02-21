import test from 'ava'
const Bir = require('../src')

test('test on use case', t => {
    const local = new Bir() 
    let x = 0
    local.on('test', () => x = 2)
    local.on('test', () => x = x*2)
    local.emit('test')
    t.is(x, 4)
})

test('test once use case', t => {
    const local = new Bir() 
    let x = 0
    local.once('test', () => x = ++x)
    local.emit('test')
    local.emit('test')
    t.is(x, 1)
})

test('test off use case', t => {
    const local = new Bir() 
    let x = true
    const callback =  () => x = !x
    local.on('test', callback)
    local.emit('test')
    local.off('test', callback)
    local.emit('test')
    t.is(x, false)
})

test('test binded off use case', t => {
    const local = new Bir() 
    let x = true
    const listener = local.on('test', () => x = !x)
    local.emit('test')
    listener.off()
    local.emit('test')
    t.is(x, false)
})

test('test chained off use case', t => {
    const local = new Bir() 
    let x = true
    local.on('test', () => x = !x).off()
    local.emit('test')
    t.is(x, true)
})

// test('test replace use case', t => {
//     const local = new Bir() 
//     let x = true
//     const callback =  () => x = !x
//     local.on('test', callback)
//     local.emit('test')
//     local.replace('test', callback, () => x = 'replaced')
//     local.emit('test')
//     t.is(x, 'replaced')
// })

// test('test binded replace use case', t => {
//     const local = new Bir() 
//     let x = true
//     const listener = local.on('test', () => x = !x)
//     local.emit('test')
//     listener.replace(() => x = 'replaced')
//     local.emit('test')
//     t.is(x, 'replaced')
// })

// test('test chained replace use case', t => {
//     const local = new Bir() 
//     let x = true
//     local.on('test', () => x = !x).replace(() => x = 'replaced')
//     local.emit('test')
//     t.is(x, 'replaced')
// })