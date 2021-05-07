const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadHttpException()
  }
  static initLoadRouters () {
    // 自动化加载路由注册
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })

    function whenLoadModule (Obj) {
      if (Obj instanceof Router) {
        InitManager.app.use(Obj.routes())
      }
    }
  }
  static loadHttpException () {
    // 导入全局异常类
    const exception = require("./http-exception")
    global.errors = exception

  }
}
module.exports = InitManager