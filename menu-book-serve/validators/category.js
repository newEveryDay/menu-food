const { LinValidator, Rule } = require('../core/lin-validator')
// 校验参数是否为正整数
class CategoryValidator extends LinValidator {
  constructor() {
    super()

    this.pid = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isOptional')

    ]
    this.categoryName = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isNotEmpty')

    ]
    this.icon = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isOptional')

    ]
  }

}

class CategoryPutValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isNotEmpty')

    ]
    this.categoryName = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isNotEmpty')

    ]
    this.icon = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isOptional')

    ]
  }
}

// 校验添加商品
class goodsAddValidator extends LinValidator {
  constructor() {
    super()
    this.mercName = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      //   new Rule('isInt', '参数必须为正整数', {min:1})
      new Rule('isNotEmpty', '必须传入参数')
    ]
    this.description = [
      new Rule('isNotEmpty', '必须传入参数')
    ]
    this.price = [
      new Rule('isInt', '参数必须为正整数', { min: 1 })
    ]
    this.stock = [
      new Rule('isInt', '参数必须为正整数', { min: 1 })
    ]
    this.categoryId = [
      new Rule('isInt', '参数必须为正整数', { min: 1 })
    ]
    // this.imgList = [
    //     new Rule('isNotEmpty', '必须传入参数')
    // ]
  }
}
// 分类获取校验
class CategoryGetValidator extends LinValidator {
  constructor() {
    super()
    this.mercName = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      //   new Rule('isInt', '参数必须为正整数', {min:1})
      new Rule('isInt', '必须传入参数')
    ]
  }
}

// 校验参数是否为正整数
class UsersValidator extends LinValidator {
  constructor() {
    super()

  }
}


module.exports = { CategoryValidator, CategoryGetValidator, UsersValidator, CategoryPutValidator, goodsAddValidator }
