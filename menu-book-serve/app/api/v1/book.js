const Router = require("koa-router")
const router = new Router()
const { Auth } = require("../../../middleWares/auth")
router.get('/v1/book', new Auth().m, async (ctx, next) => {
  ctx.body = {
    a: "book"
  }
})
module.exports = router