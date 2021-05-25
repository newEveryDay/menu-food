// class HttpException extends Error {
//   constructor(message = "服务器异常", errorCode = 10001, code = 400) {
//     super()
//     this.message = message
//     this.errorCode = errorCode
//     this.code = code
//   }
// }


class HttpException extends Error {
  constructor(msg = "服务器异常", errorCode = 10000, code = 400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg = "参数错误", errorCode = "10000") {
    super()
    this.code = 400
    this.msg = msg
    this.errorCode = errorCode
  }
}
// 成功提示
class Success extends HttpException {
  constructor(msg = "oK", data, errorCode = '0') {
    super()
    this.code = 200
    this.msg = msg
    if (data) {
      this.data = data
    }
    if (errorCode) {
      this.errorCode = errorCode
    }
  }
}
// 当查询结果在数据库中找不到
class NotFound extends HttpException {
  constructor(msg = "资源未找到", errorCode = "10000") {
    super()
    this.code = 404
    this.msg = msg
    this.errorCode = errorCode
  }
}

// 当查询结果在数据库中找不到
class AuthFailed extends HttpException {
  constructor(msg = "授权失败", errorCode = "10004") {
    super()
    this.code = 401
    this.msg = msg
    this.errorCode = errorCode
  }
}

class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10006
    this.code = 403
  }
}
class CollectError extends HttpException {
  constructor(code, msg, errorCode) {
    super()
    this.code = 400
    this.msg = "你已经收藏了"
    this.errorCode = 60002
  }
}

class disCollectError extends HttpException {
  constructor(code, msg, errorCode) {
    super()
    this.code = 400
    this.msg = "你已取消收藏"
    this.errorCode = 60002
  }
}
module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbbiden,
  CollectError,
  disCollectError
}