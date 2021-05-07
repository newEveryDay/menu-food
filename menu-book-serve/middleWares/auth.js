const jwt = require('jsonwebtoken')
const { secrety } = require("../config/config")
const { Forbbiden } = require("../core/http-exception")
class Auth {
  constructor(leval) {
    this.leval = leval
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }
  get m () {
    return async (ctx, next) => {
      let userToken = ctx.request.header.authorization
      userToken = userToken.split(" ")[1]
      let errMsg = "token不合法"
      if (!userToken) {
        throw new Forbbiden(errMsg)
      }
      try {
        var decode = jwt.verify(userToken, secrety.secretyKey)
        console.log(decode)
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          throw new Forbbiden("tooken已过期")
        }
        throw new AuthFailed(errMsg)
      }
      if (decode.scope < this.leval) {
        errMsg = "权限不足"
        throw new Forbbiden(errMsg)
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }
}

module.exports = {
  Auth
}