const regeneratorRuntime = {
  mark(fn) {
    return fn
  },
  wrap(fn) {
    const _context = {
      next: 0,  //下次执行生成器函数状态机 switch 中的下标
      sent: '', //执行完 next 调用时传入的参数值, 作为上次 yield 返回的值
      done: false,  //是否完成
      stop() {  //停止生成器的执行
        this.done = true;
      }
    }
    return {
      next(param) {
        //  修改上一次 yield 的返回值为 param
        _context.sent = param
        //  执行switch状态机函数, 得到本次返回值
        const value = fn(_context)
        return {
          done: _context.done,
          value
        }
      }
    }
  }
}

module.exports = {
  regeneratorRuntime
}