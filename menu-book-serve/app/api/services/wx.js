// const { Utils } = require('util')
const { AuthFailed } = require("../../../core/http-exception")
const axios = require("axios")
const util = require("util")
const { wx } = require('../../../config/config')
const { User } = require("../../models/user")
const { generateToken } = require("../../../core/utils")
const { Auth } = require("../../../middleWares/auth")
class WXManager {
  static async codeToken (code) {
    const url = util.format(wx.url, wx.appId, wx.secret, code)
    let result = await axios.get(url)
    // email password
    // code 小程序微信
    // 获取openid唯一表示
    const errcode = result.errcode
    if (errcode !== 0) {
      throw new AuthFailed('获取openid失败' + errcode)
    }
    let user = await User.getUserByOpenid(result.openid)
    if (!user) {
      user = await User.registerrByOpenid(result.openid)
    }
    await generateToken(user.id, Auth.USER)
  }
}
module.exports = {
  WXManager
}