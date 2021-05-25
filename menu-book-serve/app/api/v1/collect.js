const Router = require("koa-router")
const { Auth } = require("../../../middleWares/auth")
const { Collect } = require("../../models/collect")
const { CollectValidator } = require("../../../validators/collect")
const { Success } = require("../../../core/http-exception")
const router = new Router({
  prefix: '/v1/collect'
})
// 点赞
router.post('/', new Auth().m, async (ctx, next) => {
  console.log(ctx.request.body)
  const memuId = ctx.request.body
  const v = await new CollectValidator().validate(ctx, {
    id: 'menuId'
  })
  await Collect.collect(v.get('body.id'), ctx.auth.uid)
  ctx.body = new Success('收藏成功')
})
// 取消点赞
router.post('/cancel', new Auth().m, async (ctx, next) => {
  const v = await new CollectValidator().validate(ctx, {
    id: 'menuId'
  })
  await Collect.disCollect(v.get('body.id'), ctx.auth.uid)
  ctx.body = new Success('取消收藏')
})
module.exports = router