const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const sequelize = require('../../db/index')
const { NotFound, AuthFailed } = require("../../core/http-exception")
class Menu extends Model {
  static async addMenu () {

  }
}
// Sequelize.STRING数据类型为字符串
// Sequelize.STRING(64)最小长度为64
// unique 值是唯一的
// 用户的id编号我们不用显示指定，mysql会自动添加
// primaryKey主键，当属性为不变且唯一的话，都可以作为主键，如email、openid属性
// 主键的两个条件：不能重复，不能为空
// autoIncrement自动增长id编号

// 制作步骤
class Step extends Model {

}
// 所需原材料
class Ingredient extends Model {

}
Menu.init({
  // id为主键
  // 接口保护 tooken
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryId: Sequelize.INTEGER,
  // 难度系数
  difficulty: Sequelize.INTEGER,
  // 菜单名称
  menuName: Sequelize.STRING,
  // 菜单描述
  description: Sequelize.STRING,
}, {
  sequelize,
  tableName: 'Menu'
})


Ingredient.init({
  // id为主键
  // 接口保护 tooken
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  foodname: Sequelize.STRING,  //原材料名称
  amount: Sequelize.INTEGER,   //对应的用量
  unit: Sequelize.STRING,
  menuId: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'ingredient' // 重命名
})

Step.init({
  image: Sequelize.STRING,   //对应步骤图
  desc: Sequelize.STRING,
  menuId: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'step' // 重命名
})

module.exports = {
  Menu,
  Step,
  Ingredient
}
