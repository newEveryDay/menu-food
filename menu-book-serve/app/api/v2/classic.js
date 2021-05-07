const Router = require("koa-router")
const router = new Router()
const { HttpException } = require('../../../core/http-exception')
router.get('/v2/classic', (ctx, next) => {
  const error = new HttpException('gan')
  throw error
})
module.exports = router