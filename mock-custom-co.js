
function promise1() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve('第一个promise 值: 1')
    }, 1000);
  })
}

function promise2(value) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve('value: ' + value);
    }, 1000);
  })
}

function* readFile() {
  const value = yield promise1()
  const result = yield promise1(value)
  return result
}

function asyncGen(fn) {
  //  执行生成器函数
  const gen = fn()
  //  返回一个 promise
  return new Promise(function (resolve, reject) {
    //  第一次执行 .next 函数, 执行到第一个 yield 暂停
    const { done, value } = gen.next()
    //  返回的是 promise, 所以要 then 调用
    value.then((result) => {
      //  第二次调用 g.next, 拿到第一次 yield 的值做参数 (promise1中resolve 的值 : 1)
      const { value, done } = gen.next(result)
      //  没对 done 做判断, 按未完成处理
      value.then(resolve)
    })
  })
}

asyncGen(readFile).then((result) => console.log(result))