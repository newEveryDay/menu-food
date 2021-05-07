const { LinValidator, Rule } = require('../core/lin-validator')
// 校验参数是否为正整数
class AdminValidator extends LinValidator {
    constructor() {
        super()
        this.userName = [
            // 这里可以添加多个校验规则，但是规则是且的关系
            // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
            //   new Rule('isInt', '参数必须为正整数', {min:1})
            new Rule('isNotEmpty', '必须传入参数')
        ]
        this.password = [
            // new Rule('isInt', '参数必须为正整数', {min:1})
            new Rule('isNotEmpty', '必须传入参数')
        ]
    }
}

module.exports = { AdminValidator }