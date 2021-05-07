// const {AdminModel} = require('../model/admin/admin');
// const {AddressModel} = require('../model/address/address');
// const {OrderModel} = require('../model/order/order');
// const {OrderproductModel} = require('../model/order/orderproduct');
// const {CategoryModel} = require('../model/goods/category');
// const {GoodsModel} = require('../model/goods/goods');
// const {ImgModel} = require('../model/upload/upload');
const { User } = require('../app/models/user')

// // 同步表结构
User.sync({
  force: true  // 强制同步，先删除表，然后新建
});
// AdminModel.sync({
//   force: true  // 强制同步，先删除表，然后新建
// });
// AddressModel.sync({
//   force: true  // 强制同步，先删除表，然后新建
// });
// OrderModel.sync({
//   force: true  // 强制同步，先删除表，然后新建
// });
// OrderproductModel.sync({
//   force: true  // 强制同步，先删除表，然后新建
// });
// CategoryModel.sync({

//   force: true  // 强制同步，先删除表，然后新建
// });

// GoodsModel.sync({
//   force: true  // 强制同步，先删除表，然后新建
// });
// ImgModel.sync({
//   force: true  // 强制同步，先删除表，然后新建
// });
