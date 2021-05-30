const Router = require("koa-router")
const { Auth } = require("../../../middleWares/auth")
const { Collect } = require("../../models/collect")
const { Menu } = require("../../models/menu")
const { CollectValidator } = require("../../../validators/collect")
const { Success } = require("../../../core/http-exception")
const router = new Router({
  prefix: '/v1/guessYouLike'
})
// 点赞

// 获取首页猜你喜欢
router.get('/', new Auth().m, async (ctx, next) => {

  const menuList = await Menu.findAll({
    order: [
      ['pageViewNums', 'DESC']
    ]
  })
  ctx.body = new Success('获取猜你喜欢列表成功', menuList)
})
module.exports = router