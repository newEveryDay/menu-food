// npm 包通常放到第一位
const bcrypt = require('bcryptjs')
const Router = require("koa-router")
const { Auth } = require("../../../middleWares/auth")
const { UsersValidator } = require('../../../validators/user')
const { Success } = require("../../../core/http-exception")
const { User } = require('../../models/user')

const router = new Router({
  prefix: '/v1/user'
})
router.post('/regisetr', async (ctx, next) => {
  const V = await new UsersValidator().validate(ctx)
  const salt = bcrypt.genSaltSync(10)
  // 通过盐加密密码
  const psw = bcrypt.hashSync(V.get("body.password"), salt)

  // 思维
  // 接收参数
  const user = {
    nickname: V.get("body.nickname"),
    email: V.get("body.email"),
    password: psw
  }
  await User.create(user)
  throw new Success()
})

router.get('/logout', async (ctx, next) => {
  ctx.body = new Success('退出成功')
})

router.post('/update', new Auth().m, async (ctx, next) => {
  const usrInfo = ctx.request.body
  await User.unpdataUserInfo(usrInfo, ctx.auth.uid)
  ctx.body = new Success('更新用户信息成功')
})
module.exports = router