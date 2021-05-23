const { LinValidator, Rule } = require('../core/lin-validator')
const { longinType } = require('../lib/enum')
// 校验参数是否为正整数
class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.account = [

      new Rule('isLength', "不符合账号规则", {
        min: 4,
        max: 32
      })

    ]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', "至少6个字符", {
        min: 4,
        max: 128
      })
    ]
    // type 枚举

  }
  validateLoginType (vals) {
    if (!vals.body.type) {
      throw new Error("type为必填参数")
    }
    if (!longinType.isThisType(vals.body.type)) {
      throw new Error("type参数不合法")
    }
  }

}

class NotEmptyValidate extends LinValidator {
  constructor() {
    super()
    this.token = [
      new Rule('isLength', '不允许为空', {
        min: 1
      })
    ]
  }
}

module.exports = { TokenValidator, NotEmptyValidate }