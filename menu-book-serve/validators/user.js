const { User } = require('../app/models/user')
const { LinValidator, Rule } = require('../core/lin-validator')
// 校验参数是否为正整数
class WXCodeValidator extends LinValidator {
  constructor() {
    super()
    this.nickname = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isNotEmpty')

    ]
  }
}


// 校验参数是否为正整数
class UsersValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isEmail', "不符合参数规范")
    ]
    this.nickname = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      //   new Rule('isInt', '参数必须为正整数', {min:1})
      new Rule('isNotEmpty', '必须传入参数')
    ]
    this.password = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isLength', '密码至少为6个字符', { min: 6 })
    ]

    // this.avatarUrl = [
    //     // new Rule('isInt', '参数必须为正整数', {min:1})
    //     new Rule('isNotEmpty', '必须传入参数')
    // ]
    // this.gender = [
    //     // new Rule('isInt', '参数必须为正整数', {min:1})
    //     new Rule('isNotEmpty', '必须传入参数')
    // ]
    // this.unique = [
    //     // new Rule('isInt', '参数必须为正整数', {min:1})
    //     new Rule('isNotEmpty', '必须传入参数')
    // ]

  }
  validatePassword (vals) {

  }
  async validatePassword (vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email: email
      }
    })

    if (user) {
      throw new Error("邮箱已存在")
    }
  }
}

module.exports = { UsersValidator, WXCodeValidator }