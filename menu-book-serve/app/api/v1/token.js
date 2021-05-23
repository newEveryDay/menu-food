// npm 包通常放到第一位
const Router = require("koa-router")
// const jwt = require('jsonwebtoken')
const { TokenValidator, NotEmptyValidate } = require("../../../validators/token")
const { longinType } = require("../../../lib/enum")
const { User } = require("../../models/user")
const { generateToken } = require("../../../core/utils")
const { Success } = require("../../../core/http-exception")
const { Auth } = require('../../../middleWares/auth')
const { WXManager } = require('../services/wx')

const router = new Router({
  prefix: '/v1'
})

// async function delay (time) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve()
//     }, time)
//   })
// };
// await delay(6000)
router.post('/token', async (ctx, next) => {
  console.log(ctx.request.body)
  // const token = jwt.sign({ foo: 'bar' }, 'shhhhh')
  const v = await new TokenValidator().validate(ctx)
  // 业务逻辑写在哪？ 业务分层 model(一般写业务中) server
  // 接口方法中api中编写 一般不写在api
  // model中
  // servre
  // 
  let token
  switch (v.get('body.type')) {
    case longinType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case longinType.USER_MINI_PROGRAM:
      token = await WXManager.codeToken(v.get('body.account'))
      break
    case longinType.USER_MOBILE:
      break
    default:
      throw new Error("用户信息正确")
  }
  console.log(123)
  // 生成token
  ctx.body = {
    code: 200,
    data: {
      token
    },
    message: '登录成功',
  }

})

router.post('/verify', async (ctx) => {
  // token
  const v = await new NotEmptyValidate().validate(ctx)
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    isValid: result
  }
})

router.get('/userInfo', async (ctx, next) => {
  // const token = jwt.sign({ foo: 'bar' }, 'shhhhh')
  // 业务逻辑写在哪？ 业务分层 model server
  // 接口方法中api中
  // model中
  // servre

  ctx.body = {
    code: 200,
    data: {
      roles: "admin", name: '小王', avatar: 'dfdfd', introduction: "dfdfdf"
    },
    message: '获取用户信息成功',
  }
  // new Success("获取token成功")

})

async function emailLogin (account, secret) {
  const user = await User.verityEmailPassWord(account, secret)
  return token = generateToken(user.id, Auth.USER)
}
module.exports = router