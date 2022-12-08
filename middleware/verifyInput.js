const validator = require('validator')
const moment = require('moment-timezone')
const timeRule = { strict: true, strictSeparator: true }
const passwordRule = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 0,
  minSymbols: 0
}
const requirementOfPriceRule = ['category', 'price', 'point', 'term', 'publish_at']

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

const verifyPriceRule = async (req, res, next) => {
  const { category, price, point, remark, term, publish_at } = req.body

  if (!requirementOfPriceRule.every(e => req.body[e] !== '')) {
    req.flash('createPriceRoleInput', req.body)
    req.flash('errorMessage', '缺少必須資訊，請重新檢查')
    return res.redirect('back')
  }
  if (category.length > 30 || remark.length > 50) {
    req.flash('createPriceRoleInput', req.body)
    req.flash('errorMessage', '「種類」限填 30 字、「備註」限填 50 字')
    return res.redirect('back')
  }
  if (isNaN(+price) || isNaN(+point) || isNaN(+term)) {
    req.flash('createPriceRoleInput', req.body)
    req.flash('errorMessage', '價格、點數、使用期限必須為「數字」')
    return res.redirect('back')
  }
  if (!validator.isISO8601(publish_at, timeRule)) {
    req.flash('createPriceRoleInput', req.body)
    req.flash('errorMessage', '「上架日」格式錯誤')
    return res.redirect('back')
  }
  next()
}

module.exports = {
  verifyRegisterData,
  verifyPriceRule
}
