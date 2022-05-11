function promise1() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve('第一个 promise 值: 1')
    }, 1000);
  })
}

function promise2(value) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve('第二个 promise 收到 第一个 promise 的值: => ' + value)
    }, 1000);
  })
}

function* readFile(fn) {
  const value = yield promise1()
  const result = yield promise2(value)
  return result
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var res = gen[key](arg);
    var value = res.value
  } catch (error) {
    reject(error);
    return
  }

  if (!res.done) {
    Promise.resolve(value).then(_next, _throw);
  } else {
    resolve(value);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this, args = arguments
    return new Promise(function(resolve, reject){
      var gen = fn.apply(self, args)
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value)
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err)
      }
      _next(undefined)
    })
  }
}

function async(fn) {
  return _asyncToGenerator(fn)()
}

async(readFile).then(result => console.log(result))