const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const sequelize = require('../../db/index')
const { NotFound, AuthFailed } = require("../../core/http-exception")
class User extends Model {
  static async verityEmailPassWord (account, password) {
    const user = await User.findOne({
      where: {
        email: account
      }
    })
    if (!user) {
      throw new NotFound("邮箱不存在")
    }
    if (password) {
      const pass = bcrypt.compareSync(password, user.password)
      if (!pass) {
        throw new AuthFailed("密码不正确")
      }
    }

    return user
  }
  static async getUserByOpenid (openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }
  static async registerrByOpenid (openid) {
    const user = await User.create({
      openid
    })
  }
  static async unpdataUserInfo (usrInfo, uid) {

    const user = await User.findOne({
      where: {
        id: uid
      }
    })
    if (!user) {
      throw new NotFound()
    }
    await User.update(usrInfo, {
      where: {
        id: uid
      }
    })
  }
}
// Sequelize.STRING数据类型为字符串
// Sequelize.STRING(64)最小长度为64
// unique 值是唯一的
// 用户的id编号我们不用显示指定，mysql会自动添加
// primaryKey主键，当属性为不变且唯一的话，都可以作为主键，如email、openid属性
// 主键的两个条件：不能重复，不能为空
// autoIncrement自动增长id编号
User.init({
  // id为主键
  // 接口保护 tooken
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  password: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  avatarUrl: Sequelize.STRING,
  gender: Sequelize.BIGINT,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'user'
})

module.exports = {
  User
}
