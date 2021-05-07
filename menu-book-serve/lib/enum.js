function isThisType (val) {
  for (let key in this) {
    if (this[key] === val) {
      return true
    }
  }
  return false
}

const longinType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  isThisType
}

module.exports = {
  longinType
}