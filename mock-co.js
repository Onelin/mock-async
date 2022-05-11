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


function co(gen) {
  return new Promise(function (resolve, reject) {
    const g = gen()
    function next(param) {
      const { value, done } = g.next(param)
      if (!done) {  //增加是否完成判断, 未完成继续
        Promise.resolve(value).then((result) => next(result))
      } else {
        //完成直接返回
        resolve(value)
      }
    }
    next()
  })
}

co(readFile).then((result) => console.log(result))