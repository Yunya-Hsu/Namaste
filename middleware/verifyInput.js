const validator = require('validator')

// validator rules
const timeRule = { strict: true, strictSeparator: true }
const passwordRule = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 0,
  minSymbols: 0
}

// checklist
const requirementOfPriceRule = ['category', 'price', 'point', 'term', 'publish_at']
const requirementOfCourse = ['title', 'teacher_id', 'user', 'point', 'publish_at']

// models
const UserModel = require('../models/user_model')
const AdminStudioModel = require('../models/admin_studio_model')



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
  const isExistEmail = await UserModel.findUserByEmail(email)
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

const verifyCourse = async (req, res, next) => {
  const { title, description, teacher_id, livestream_email, point } = req.body

  if (!requirementOfCourse.every(e => req.body[e] !== '')) {
    req.flash('createCourseInput', req.body)
    req.flash('errorMessage', '缺少必須資訊，請重新檢查')
    return res.redirect('back')
  }

  if (title.length > 30 || description.length > 100) {
    req.flash('createCourseInput', req.body)
    req.flash('errorMessage', '「課程名稱」限填 30 字、「描述」限填 100 字')
    return res.redirect('back')
  }

  if (isNaN(+point)) {
    req.flash('createCourseInput', req.body)
    req.flash('errorMessage', '點數必須為「數字」')
    return res.redirect('back')
  }

  // 檢查 teacher_id 是否可使用（隸屬該教室）
  const validateTeacher = await AdminStudioModel.validateStudioTeacher(+teacher_id, req.studio.id)
  if (validateTeacher.length <= 0) {
    req.flash('createCourseInput', req.body)
    req.flash('errorMessage', '授課教師不正確')
    return res.redirect('back')
  }

  // 檢查直播人員帳號是否存在
  const livestreamAccount = await AdminStudioModel.validateLivestreamAccount(livestream_email)
  if (!livestreamAccount) {
    req.flash('createCourseInput', req.body)
    req.flash('errorMessage', '直播人員帳號錯誤')
    return res.redirect('back')
  }
  req.body.livestreamAccount = livestreamAccount.id

  next()
}

module.exports = {
  verifyRegisterData,
  verifyPriceRule,
  verifyCourse
}
