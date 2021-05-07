const Sequelize = require('sequelize')
/**
 * 配置数据库
 * 第一个参数 boblog    数据库名字
 * 第二个参数 root      数据库名字
 * 第三个参数 password  数据库密码
 */
const sequelize = new Sequelize('menubook', 'root', 'zyp@712223', {
  host: '47.116.142.187',
  port: '3306',
  logging: true, //默认值为true,是否在控制台中显示具体的mysql操作
  dialect: 'mysql',
  operatorsAliases: false,
  dialectOptions: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  define: {
    timestamps: true, // 是否自动创建时间字段， 默认会自动创建createdAt、updatedAt
    paranoid: true, // 是否自动创建deletedAt字段
    createdAt: "create_time", // 重命名字段
    updatedAt: "update_time",
    deletedAt: "delete_time",
    underscored: true // 开启下划线命名方式，默认是驼峰命名
  },
  // pool: {
  //     max: 5,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000
  // },
  timezone: '+08:00' //东八时区
})
// force: true 当我们添加字段的时候数据库会自动删除原先的表格并更新字段,开发阶段可以设置为true
// 注意在生产环境下千万不要将其设置为true，它会把所有的记录都删除掉
// 所以我们还是设置为false比较安全，添加字段，我们还是手动删除原先的表格然后刷新加载比较好
// sequelize.sync({
//     force: true
// })
sequelize.sync()

//验证是否连接成功
sequelize.authenticate().then(() => {
  console.log('数据库连接成功')
}).catch(err => {
  console.error('Failed', err)
})


module.exports = sequelize
