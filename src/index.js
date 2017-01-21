var listners = {}

const on = (id, fn) => {
  if (listners[id]) listners[id].push(fn)
  else listners[id] = [fn]
    return {
    remove: remove.bind(null, id, fn),
    replace: replace.bind(null, id, fn)
  }
}

const remove = (id, fn) => {
  const index = listners[id].indexOf(fn)
  if (~index) listners[id].splice(index, 1)
}

const once = (id, fn) => {
  function fnBox (...args) {
    fn(...args)
    remove(id, fnBox)
  }
  return on(id, fnBox)
}

const debounce = (id, fn, time = 0) => {
  let timer
  function fnBox (...args) {
    clearTimeout(timer)
    timer = setTimeout(fn.bind(null, ...args), time)
  }
  return on(id, fnBox)
}

const replace = (id, fn, newFn) => {
  const index = listners[id].findIndex(fn)
  listners[id] = newFn
}

const emit = (id, ...args) => {
  const _listners = listners[id]
  if (!_listners) return
  _listners.map(fn => fn(...args))
}

const clear = () => {
  listners = {}
}

module.exports = {
  on,
  remove,
  once,
  emit,
  replace,
  debounce,
  clear
}