const Router = require("koa-router")
const { Auth } = require("../../../middleWares/auth")
const { CategoryValidator, CategoryPutValidator } = require("../../../validators/category")
const { Category } = require("../../models/category")
const { Success } = require("../../../core/http-exception")
const router = new Router({
  prefix: '/v1/category'
})
router.post('/addCategory', async (ctx, next) => {
  const v = await new CategoryValidator().validate(ctx)
  const category = await Category.addCategory(v.get("body.pid"), v.get("body.categoryName"), v.get("body.icon"))
  ctx.body = new Success('创建成功', category)

})
router.post('/upDateCategory', async (ctx, next) => {
  const v = await new CategoryPutValidator().validate(ctx)
  const category = await Category.upDateCategory(v.get("body.id"), v.get("body.categoryName"), v.get("body.icon"))
  ctx.body = new Success('创建成功', category)

})
router.get('/getCategory', async (ctx, next) => {
  const category = await Category.getCategory()
  ctx.body = new Success('获取分类', category)
})
module.exports = router