const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const sequelize = require('../../db/index')
const { CollectError, disCollectError, NotFound } = require("../../core/http-exception")
const { Menu } = require("./menu")
class Collect extends Model {
  // 用户收藏
  static async collect (menuId, uid) {
    const collect = await Collect.findOne({
      where: {
        uid,
        menuId
      }
    })
    if (collect) {
      throw new CollectError()
    }
    return sequelize.transaction(async t => {
      await Collect.create({
        uid,
        menuId,
      }, {
        transaction: t
      })
      const menu = await Menu.findOne({
        where: {
          id: menuId
        }
      })

      await menu.increment('collectNums', {
        by: 1,
        transaction: t
      })
    })
  }
  // 用户取消收藏
  static async disCollect (menuId, uid) {
    const collect = await Collect.findOne({
      where: {
        uid,
        menuId
      }
    })
    if (!collect) {
      throw new disCollectError()
    }
    return sequelize.transaction(async t => {
      await Collect.destroy({
        where: {
          menuId,
          uid
        }
      }, {
        transaction: t
      })
      const menu = await Menu.findOne({
        where: {
          id: menuId
        }
      })
      await menu.decrement('collectNums', {
        by: 1,
        transaction: t
      })
    })
  }
  // 用户是否收藏某个菜单
  static async userCollect (menuId, uid) {
    const collect = await Collect.findOne({
      where: {
        uid,
        menuId
      }
    })
    return collect ? true : false

  }
  // 获取用户的收藏
  static async getMyMenuCollect (uid) {
    const collects = await Collect.findAll({
      where: {
        uid
      }
    })
    const MenuIds = collects.map((item) => {
      return item.menuId
    })
    if (!collects) {
      throw new NotFound()
    }
    return await Menu.findAll({
      where: {
        id: MenuIds
      }
    })
  }
  //  获取收藏的总数量和，用户是否收藏了此菜谱
  static async getMenuCollect (menuId, uid) {
    const favorNums = await Collect.count({
      where: {
        menuId
      }
    })
    const myFavor = await Collect.findOne({
      where: {
        menuId,
        uid
      }
    })
    return {
      collectNums: favorNums,
      collecteStatus: myFavor ? 1 : 0
    }
  }
}
// Sequelize.STRING数据类型为字符串
// Sequelize.STRING(64)最小长度为64
// unique 值是唯一的
// 用户的id编号我们不用显示指定，mysql会自动添加
// primaryKey主键，当属性为不变且唯一的话，都可以作为主键，如email、openid属性
// 主键的两个条件：不能重复，不能为空
// autoIncrement自动增长id编号

Collect.init({
  // id为主键
  // 接口保护 tooken
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: Sequelize.INTEGER,
  menuId: Sequelize.INTEGER,

}, {
  sequelize,
  tableName: 'Collect'
})

module.exports = {
  Collect
}
