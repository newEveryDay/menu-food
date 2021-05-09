const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const sequelize = require('../../db/index')
const { NotFound, AuthFailed } = require("../../core/http-exception")
class Category extends Model {
  static async addCategory (bookId, content) {
    const comment = await Comment.findOne({
      where: {
        bookId,
        content
      }
    })
    if (!comment) {
      return await Comment.create({
        bookId,
        content,
        nums: 1
      })
    } else {
      return await comment.increment('nums', {
        by: 1
      })
    }
  }

  static async getComments (bookId) {
    const comments = await Comment.findAll({
      where: {
        bookId
      }
    })
    return comments
  }

  toJSON () {
    return {
      content: this.getDataValue('content'),
      nums: this.getDataValue('nums')
    }
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
}
// Sequelize.STRING数据类型为字符串
// Sequelize.STRING(64)最小长度为64
// unique 值是唯一的
// 用户的id编号我们不用显示指定，mysql会自动添加
// primaryKey主键，当属性为不变且唯一的话，都可以作为主键，如email、openid属性
// 主键的两个条件：不能重复，不能为空
// autoIncrement自动增长id编号

Img.init({
  // id为主键
  // 接口保护 tooken
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  image: Sequelize.STRING,
}, {
  sequelize,
  tableName: 'Img'
})

module.exports = {
  Img
}
