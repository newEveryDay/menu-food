const { Sequelize, Model } = require('sequelize')
const sequelize = require('../../db/index')
const { NotFound } = require("../../core/http-exception")
class Category extends Model {
  static async addCategory (pid, categoryName, icon) {
    const isPrarent = !pid
    const category = await Category.findOne({
      where: {
        categoryName,
      }
    })

    if (!category) {
      return await Category.create({
        pid: isPrarent ? 0 : pid,
        categoryName,
        icon
      })
    }
  }
  static async upDateCategory (id, categoryName, icon = '') {
    const category = await Category.findOne({
      where: {
        id,
      }
    })

    if (!category) {
      new NotFound()
    } else {
      await Category.update({
        categoryName,
        icon
      }, {
        where: {
          id
        }
      })
    }

  }
  static async getCategory (pid) {
    const category = await Category.findAll()

    return category
  }
}
// Sequelize.STRING数据类型为字符串
// Sequelize.STRING(64)最小长度为64
// unique 值是唯一的
// 用户的id编号我们不用显示指定，mysql会自动添加
// primaryKey主键，当属性为不变且唯一的话，都可以作为主键，如email、openid属性
// 主键的两个条件：不能重复，不能为空
// autoIncrement自动增长id编号


Category.init({
  // id为主键
  // 接口保护 tooken
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pid: Sequelize.INTEGER,
  categoryName: Sequelize.STRING,
  icon: Sequelize.STRING
}, {
  sequelize,
  tableName: 'category'
})

module.exports = {
  Category
}
