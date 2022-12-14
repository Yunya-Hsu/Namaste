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
const requirementOfCourseDetail = ['date', 'start_time', 'duration', 'limitation', 'is_online', 'online_limitation', 'publish_at']
const requirementOfUpdateStudio = ['name', 'address', 'tappay_app_key', 'tappay_partner_key', 'tappay_id', 'tappay_app_id']

// utils
const { isISO8601, isDate, isTime } = require('../util/time')
const { allBeNumber, allBeBoolean } = require('../util/util')


// models
const UserModel = require('../models/user_model')
const AdminStudioModel = require('../models/admin_studio_model')
const AdminRootModel = require('../models/admin_root_model')




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

const verifyPriceRule = (req, res, next) => {
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
  if (allBeNumber([price, point, term])) {
    req.flash('createPriceRoleInput', req.body)
    req.flash('errorMessage', '價格、點數、使用期限必須為「數字」')
    return res.redirect('back')
  }
  if (!isISO8601(publish_at)) {
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

  if (allBeNumber([point])) {
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

const verifyCourseDetail = async (req, res, next) => {
  const { course_id, date, start_time, duration, limitation, is_online, online_limitation, is_oneOnOne, publish_at } = req.body

  if (!requirementOfCourseDetail.every(e => req.body[e] !== '')) {
    req.flash('createCourseDetailInput', req.body)
    req.flash('errorMessage', '缺少必須資訊，請重新檢查')
    return res.redirect('back')
  }

  if (allBeNumber([course_id, duration, limitation, online_limitation])) {
    req.flash('createCourseDetailInput', req.body)
    req.flash('errorMessage', '請檢查「課程名稱」、「時長」、「人數上限」、「線上課程人數上限」欄位')
    return res.redirect('back')
  }
  
  if (!allBeBoolean([is_online, is_oneOnOne])) {
    req.flash('createCourseDetailInput', req.body)
    req.flash('errorMessage', '請檢查「開放線上」、「一對一課程」欄位')
    return res.redirect('back')
  }

  if (!isDate(date)) {
    req.flash('createCourseDetailInput', req.body)
    req.flash('errorMessage', '請檢查「上課日期」欄位')
    return res.redirect('back')
  }

  if (!isTime(start_time)) {
    console.log('start_time: ', start_time);
    req.flash('createCourseDetailInput', req.body)
    req.flash('errorMessage', '請檢查「上課時間」欄位')
    return res.redirect('back')
  }

  if (!isISO8601(publish_at)) {
    req.flash('createCourseDetailInput', req.body)
    req.flash('errorMessage', '請檢查「上架日」欄位')
    return res.redirect('back')
  }

  if (Number(is_oneOnOne) === 1) {
    if (Number(is_online) !== 1 || Number(online_limitation) > 1 || Number(limitation) > 0 ) {
      req.flash('createCourseDetailInput', req.body)
      req.flash('errorMessage', '建立「一對一」課程時，實體人數須為 0、線上人數上限 1 人')
      return res.redirect('back')
    }
  }

  const courseFromDb = await AdminStudioModel.getCourseById(course_id, req.studio.id)
  if (!courseFromDb) {
    req.flash('createCourseDetailInput', req.body)
    req.flash('errorMessage', '沒有權限新增此課程')
    return res.redirect('back')
  }

  next()
}

const verifyTeacher = (req, res, next) => {
  const { name, major } = req.body

  if (!name || !major) {
    req.flash('createTeacherInput', req.body)
    req.flash('errorMessage', '缺少「老師名稱」或「專業」')
    return res.redirect('back')
  }

  if (name.length > 15 || major.length > 30) {
    req.flash('createTeacherInput', req.body)
    req.flash('errorMessage', '「老師名稱」限填 15 字、「專業」限填 30 字')
    return res.redirect('back')
  }

  next()
}

const verifyStudioInfo = (req, res, next) => {
  const { name, introduction_title, address, phone, tappay_app_key, tappay_partner_key, tappay_id, tappay_app_id } = req.body

  if (!requirementOfUpdateStudio.every(e => req.body[e] !== '')) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', '缺少必須資訊，請重新檢查')
    return res.redirect('back')
  }
  if (name.length > 30 || introduction_title.length > 50 || address.length > 30 || phone.length > 30) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', '「教室名稱、地址、電話」限填 30 字、「簡介」限填 50 字')
    return res.redirect('back')
  }
  if (tappay_app_key.length > 70) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', '請檢查「TapPay App Key」')
    return res.redirect('back')
  }
  if (tappay_partner_key.length > 70) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', '請檢查「TapPay Partner Key」')
    return res.redirect('back')
  }
  if (tappay_id.length > 30) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', '請檢查「TapPay ID」')
    return res.redirect('back')
  }
  if (tappay_app_id.length > 8) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', '請檢查「TapPay App ID」')
    return res.redirect('back')
  }

  next()
}

const verifyStudioForCreate = async (req, res, next) => {
  const { name, subdomain, manager} = req.body

  if (!req.files.logo) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', '缺少「Logo 圖檔」')
    return res.redirect('back')
  }
  if (!name || !subdomain) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', '缺少「教室名稱」或「Subdomain」')
    return res.redirect('back')
  }
  const checkSubdomainResult = await AdminRootModel.checkSubdomain(subdomain)
  if (checkSubdomainResult.length > 0) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', '「subdomain」重複')
    return res.redirect('back')
  }
  
  const managerAccount = await UserModel.findUserByEmail(manager)
  if (!managerAccount) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', `${manager} 不存在`)
    return res.redirect('back')
  }
  req.body.managerId = managerAccount.id

  next()
}

module.exports = {
  verifyRegisterData,
  verifyPriceRule,
  verifyCourse,
  verifyCourseDetail,
  verifyTeacher,
  verifyStudioInfo,
  verifyStudioForCreate
}
