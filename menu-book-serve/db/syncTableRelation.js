
const sequelize = require('./index.js');
// 导入商品分类表和商品表
const {CategoryModel} = require('../model/goods/category');
const {GoodsModel} = require('../model/goods/goods');
const {ImgModel} = require('../model/upload/upload');
// 商品分类和商品   一个商品分类对应一个商品表 p_id为连接外键
CategoryModel.hasMany(GoodsModel, {
    foreignKey: {
      allowNull: false
    }
  }
)
GoodsModel.belongsTo(CategoryModel, {
  foreignKey: {
    allowNull: false
  }
})

// 一个商品对应一张商品主图 p_img_id为连接外键
GoodsModel.hasMany(ImgModel, {
  foreignKey: {
    allowNull: false
  }
})


sequelize.sync({
  force: true      // 强制同步
});
