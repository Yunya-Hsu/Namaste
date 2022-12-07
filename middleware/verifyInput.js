const validator = require('validator')
const passwordRule = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 0,
  minSymbols: 0
}

const User = require('../models/user_model')

const verifyRegisterData = async (req, res, next) => {
  const { name, email, password, confirmedPassword } = req.body
  const errorMessage = []
  if (!name) {
    errorMessage.push('缺少 email 或 name')
  }
  if (!validator.isEmail(email)) {
    errorMessage.push('請檢查 email 格式')
  }
  if (password !== confirmedPassword) {
    errorMessage.push('「密碼」及「確認密碼」不相符')
  }
  if (!validator.isStrongPassword(password, passwordRule)) {
    errorMessage.push('請使用高強度密碼')
  }
  const isExistEmail = await User.findUserByEmail(email)
  if (isExistEmail) {
    errorMessage.push('此 Email 已被註冊')
  }
  
  if (errorMessage.length >= 1) {
    req.flash('registerInput', req.body)
    req.flash('errorMessage', errorMessage.join('、'))
    return res.redirect('/user/register')
  }
  next()
}

module.exports = {
  verifyRegisterData,
}
