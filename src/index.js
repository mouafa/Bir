'use strict'

class Bir {
  constructor() {
    this.canals = {}
  }
  
  on(id, fn) {
    if (this.canals[id]) this.canals[id].push(fn)
    else this.canals[id] = [fn]
    return Object.assign(this, {
      off: this.off.bind(this, id, fn),
      replace: this.replace.bind(this, id, fn),
    })
  }
  
  off(id, fn) {
    const index = this.canals[id].indexOf(fn)
    if (~index) this.canals[id].splice(index, 1)
    return this
  }
  
  once(id, fn) {
    const fnBox = (...args) => {
      fn(...args)
      this.off(id, fnBox)
    }
    return this.on(id, fnBox)
  }
  
  
  clear(id) {
    this.canals[id] = []
    return this
  }

  debounce(id, fn, time = 0) {
    let timer
    function fnBox (...args) {
      clearTimeout(timer)
      timer = setTimeout(fn.bind(null, ...args), time)
    }
    return this.on(id, fnBox)
  }

  replace(id, fn, newFn) {
    const index = this.canals[id].findIndex(fn)
    if (~index) this.canals[id][index] = newFn
    return this
  }
  
  emit(id, ...args) {
    const callbacks = this.canals[id]
    if (callbacks) callbacks.map(fn => fn(...args))
    return this
  }
  
  broadcast(id, ...args) {
   if (this === root) {
     this.emit(id, ...args)
     return this
    }
    this.emit(id, ...args)
    this.emit.call(root, id, ...args)
    return this
  }
  
  canal() {
    return this
  }

}

const root = new Bir()
console.log('root', root)

function BirWrapper() {
  if (!new.target) return root
  return new Bir()
}

module.exports = BirWrapper