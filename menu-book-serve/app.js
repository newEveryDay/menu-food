const Koa = require('koa')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const catchError = require('./middleWares/exception')
const InitManager = require('./core/init')
const static = require('koa-static')
// 实例化koa
const app = new Koa()
app.use(logger())
// const book = require('./api/v1/book')
// const classic = require('./api/v2/classic')
// 实例化路由
// const router = new Router()
// web开发好的代码：可阅读性 利于维护 提高编程效率
// 编程 -  主题 - 拆分 -文件
// 数据
// 应用程序中间件
app.use(catchError)
app.use(bodyparser())
app.use(static(__dirname, '/public'))
InitManager.initCore(app)

// 客户端兼容性 老旧版本
//  v1 v2 v3
app.listen(3000)