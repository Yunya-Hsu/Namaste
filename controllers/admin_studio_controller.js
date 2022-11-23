/* eslint-disable camelcase */
const moment = require('moment-timezone')

// models
const StudioAdmin = require('../models/admin_studio_model')
const Studio = require('../models/studio_model')

// utils
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFileToS3 } = require('../util/s3')

// basic parameters
const requirementOfPriceRule = ['category', 'price', 'point', 'term', 'publish_at']
const requirementOfCourse = ['title', 'teacher_id', 'user', 'point', 'publish_at']
const requirementOfCourseDetail = ['date', 'start_time', 'duration', 'limitation', 'is_online', 'online_limitation', 'publish_at']
const requirementOfUpdateStudio = ['name', 'address', 'tappay_app_key', 'tappay_partner_key', 'tappay_id', 'tappay_app_id']

const renderHomePage = async (req, res) => {
  const studio = req.user.studio

  // FIXME: add dashboard page for studio admin
  res.redirect(`/${studio.subdomain}/admin/price`)
}





const renderCreatePricePage = async (req, res) => {
  const studio = req.user.studio
  const input = req.flash('createPriceRoleInput')[0]

  res.render('admin_studio/createPrice', {
    studio,
    input
  })
}

const createPriceRule = async (req, res) => {
  const { category, price, point, remark, term, publish_at } = req.body
  const studio = req.user.studio

  // 檢查前端資料，若不足則擋下
  if (!requirementOfPriceRule.every(e => req.body[e] !== '')) {
    req.flash('createPriceRoleInput', req.body)
    req.flash('errorMessage', 'missing information')
    return res.redirect(`/${studio.subdomain}/admin/price/create`)
  }

  // check if price, point, term are numbers
  if (isNaN(+price) || isNaN(+point) || isNaN(+term)) {
    req.flash('createPriceRoleInput', req.body)
    req.flash('errorMessage', '價格、點數、使用期限必須為「數字」')
    return res.redirect(`/${studio.subdomain}/admin/price/create`)
  }

  // insert data
  const publishAt = moment(publish_at).format('YYYY-MM-DD HH:mm:ss')
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  await StudioAdmin.createPriceRule(studio.id, category, price, point, remark, term, publishAt, currentTime, currentTime)
  req.flash('successMessage', 'Price rule is created')
  res.redirect(`/${studio.subdomain}/admin/price`)
}

const renderEditPricePage = async (req, res) => {
  const studio = req.user.studio
  const priceRuleId = req.params.priceRuleId
  const input = await StudioAdmin.getDedicatedPriceRule(studio.id, priceRuleId)

  if (!input) {
    req.flash('errorMessage', '價格編號有誤')
    return res.redirect(`/${studio.subdomain}/admin/price`)
  }

  input.publish_at = moment(input.publish_at).format('YYYY-MM-DD[T]HH:mm:ss')
  res.render('admin_studio/editPrice', {
    studio,
    input
  })
}

const updatePriceRule = async (req, res) => {
  const studio = req.user.studio
  const priceRuleId = req.params.priceRuleId
  const { category, price, point, remark, term, publish_at } = req.body

  // 檢查前端資料，若不足則擋下
  if (!requirementOfPriceRule.every(e => req.body[e] !== '')) {
    req.flash('errorMessage', 'missing information')
    return res.redirect(`/${studio.subdomain}/admin/price/${priceRuleId}`)
  }

  // check if price, point, term are numbers
  if (isNaN(+price) || isNaN(+point) || isNaN(+term)) {
    req.flash('errorMessage', '價格、點數、使用期限必須為「數字」')
    return res.redirect(`/${studio.subdomain}/admin/price/${priceRuleId}`)
  }

  // update data
  const publishAt = moment(publish_at).format('YYYY-MM-DD HH:mm:ss')
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  await StudioAdmin.updatePriceRule(priceRuleId, category, price, point, remark, term, publishAt, currentTime)
  req.flash('successMessage', `「${category}」已更新`)
  res.redirect(`/${studio.subdomain}/admin/price`)
}

const renderAllPriceRule = async (req, res) => {
  const studio = req.user.studio
  const priceRuleList = await StudioAdmin.getPriceRules(studio.id)

  res.render('admin_studio/priceRule', {
    studio,
    priceRuleList
  })
}







const renderCreateCoursePage = async (req, res) => {
  const studio = req.user.studio
  const input = req.flash('createCourseInput')[0]

  // 撈出該教室的 teacher 清單
  const teacherList = await StudioAdmin.getStudioTeachers(studio.id)
  studio.teacherList = teacherList

  res.render('admin_studio/createCourse', {
    studio,
    input
  })
}

const createCourse = async (req, res) => {
  const studio = req.user.studio

  // 檢查前端資料，若不足則擋下
  if (!requirementOfCourse.every(e => req.body[e] !== '')) {
    req.flash('createCourseInput', req.body)
    req.flash('errorMessage', 'missing information')
    return res.redirect(`/${studio.subdomain}/admin/course/create`)
  }

  const { title, description, teacher_id, livestream_email, point } = req.body

  // 檢查 point 是否為數字
  if (isNaN(+point)) {
    req.flash('createCourseInput', req.body)
    req.flash('errorMessage', '點數必須為「數字」')
    return res.redirect(`/${studio.subdomain}/admin/course/create`)
  }

  // 檢查 teacher_id 是否可使用（隸屬該教室）
  const validateTeacher = await StudioAdmin.validateStudioTeacher(+teacher_id, studio.id)
  if (validateTeacher.length <= 0) {
    req.flash('createCourseInput', req.body)
    req.flash('errorMessage', '授課教師不正確')
    return res.redirect(`/${studio.subdomain}/admin/course/create`)
  }

  // 檢查直播人員帳號是否存在
  const livestreamAccount = await StudioAdmin.validateLivestreamAccount(livestream_email)
  if (!livestreamAccount) {
    req.flash('createCourseInput', req.body)
    req.flash('errorMessage', '直播人員帳號錯誤')
    return res.redirect(`/${studio.subdomain}/admin/course/create`)
  }

  // 寫入 db
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  await StudioAdmin.createCourse(title, description, teacher_id, studio.id, livestreamAccount.id, point, currentTime)
  req.flash('successMessage', 'Course is created')
  return res.redirect(`/${studio.subdomain}/admin/course/create`)
}

const renderEditCoursePage = async (req, res) => {
  const studio = req.user.studio
  const courseId = req.params.courseId
  const input = await StudioAdmin.getDedicatedCourse(studio.id, courseId)

  if (!input) {
    req.flash('errorMessage', '課程編號有誤')
    return res.redirect(`/${studio.subdomain}/admin/course`)
  }

  const teacherList = await StudioAdmin.getStudioTeachers(studio.id)
  studio.teacherList = teacherList

  res.render('admin_studio/editCourse', {
    studio,
    input
  })
}

const updateCourse = async (req, res) => {
  const studio = req.user.studio
  const courseId = req.params.courseId

  // 檢查前端資料，若不足則擋下
  if (!requirementOfCourse.every(e => req.body[e] !== '')) {
    req.flash('errorMessage', 'missing information')
    return res.redirect(`/${studio.subdomain}/admin/course/${courseId}`)
  }

  const { title, description, teacher_id, livestream_email, point } = req.body

  // 檢查 point 是否為數字
  if (isNaN(+point)) {
    req.flash('errorMessage', '點數必須為「數字」')
    return res.redirect(`/${studio.subdomain}/admin/course/${courseId}`)
  }

  // 檢查 teacher_id 是否可使用（隸屬該教室）
  const validateTeacher = await StudioAdmin.validateStudioTeacher(+teacher_id, studio.id)
  if (validateTeacher.length <= 0) {
    req.flash('errorMessage', '授課教師不正確')
    return res.redirect(`/${studio.subdomain}/admin/course/${courseId}`)
  }

  // 檢查直播人員帳號是否存在
  const livestreamAccount = await StudioAdmin.validateLivestreamAccount(livestream_email)
  if (!livestreamAccount) {
    req.flash('errorMessage', '直播人員帳號錯誤')
    return res.redirect(`/${studio.subdomain}/admin/course/${courseId}`)
  }

  // 寫入 db
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  await StudioAdmin.updateCourse(courseId, title, description, teacher_id, livestreamAccount.id, point, currentTime)
  req.flash('successMessage', `「${title}」 已更新`)
  res.redirect(`/${studio.subdomain}/admin/course`)
}

const renderAllCourses = async (req, res) => {
  const studio = req.user.studio
  const courseList = await StudioAdmin.getStudioCourses(studio.id)

  res.render('admin_studio/course', {
    studio,
    courseList
  })
}






const renderCreateCourseDetailPage = async (req, res) => {
  const studio = req.user.studio
  const input = req.flash('createCourseDetailInput')[0]

  // 撈出該教室的 course 清單
  const courseList = await StudioAdmin.getStudioCourses(studio.id)
  studio.courseList = courseList

  res.render('admin_studio/createCourseDetail', {
    studio,
    input
  })
}

const createCourseDetail = async (req, res) => {
  const studio = req.user.studio

  // 檢查前端資料，若不足則擋下
  if (!requirementOfCourseDetail.every(e => req.body[e] !== '')) {
    req.flash('createCourseDetailInput', req.body)
    req.flash('errorMessage', 'missing information')
    return res.redirect(`/${studio.subdomain}/admin/courseDetail`)
  }

  const { course_id, date, start_time, duration, limitation, is_online, online_limitation, publish_at } = req.body

  // 檢查 course_id 是否隸屬該教室
  const courseFromDb = await StudioAdmin.getCourseById(course_id, studio.id)
  if (!courseFromDb) {
    req.flash('createCourseDetailInput', req.body)
    req.flash('errorMessage', '沒有權限新增此課程')
    return res.redirect(`/${studio.subdomain}/admin/courseDetail`)
  }

  // 檢查 duration, limitation, is_online, online_limitation 是否為數字
  if (isNaN(+duration) || +duration <= 0 || isNaN(+limitation) || isNaN(+is_online) || isNaN(+online_limitation)) {
    req.flash('createCourseDetailInput', req.body)
    req.flash('errorMessage', '請檢查「時長」、「人數上限」、「開放線上」欄位')
    return res.redirect(`/${studio.subdomain}/admin/courseDetail`)
  }

  // 檢查 is_online 和 online_limitation 狀態是否相符
  if (+is_online === 0 && +online_limitation > 0) {
    req.flash('createCourseDetailInput', req.body)
    req.flash('errorMessage', '不開放線上課程時，「線上課程人數上限」須為 0')
    return res.redirect(`/${studio.subdomain}/admin/courseDetail`)
  }
  if (+is_online === 1 && +online_limitation <= 0) {
    req.flash('createCourseDetailInput', req.body)
    req.flash('errorMessage', '開放線上課程時，「線上課程人數上限」至少需 1 人')
    return res.redirect(`/${studio.subdomain}/admin/courseDetail`)
  }

  // 寫入 db
  const publishAt = moment(publish_at).format('YYYY-MM-DD HH:mm:ss')
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  await StudioAdmin.createCourseDetail(course_id, date, start_time, duration, is_online, limitation, online_limitation, publishAt, currentTime)
  req.flash('successMessage', '課程上架成功！')
  return res.redirect(`/${studio.subdomain}/admin/courseDetail`)
}

const renderEditCourseDetailPage = async (req, res) => {
  const studio = req.user.studio
  const courseDetailId = req.params.courseDetailId
  const input = await StudioAdmin.getDedicatedCourseDetail(studio.id, courseDetailId)

  if (!input) {
    req.flash('errorMessage', '課程編號有誤')
    return res.redirect(`/${studio.subdomain}/admin/courseDetail`)
  }

  input.publish_at = moment(input.publish_at).format('YYYY-MM-DD[T]HH:mm:ss')
  res.render('admin_studio/editCourseDetail', {
    studio,
    input
  })
}

const updateCourseDetail = async (req, res) => {
  const studio = req.user.studio
  const courseDetailId = req.params.courseDetailId

  // 檢查前端資料，若不足則擋下
  if (!requirementOfCourseDetail.every(e => req.body[e] !== '')) {
    req.flash('errorMessage', 'missing information')
    return res.redirect(`/${studio.subdomain}/admin/courseDetail/${courseDetailId}`)
  }

  const { course_id, date, start_time, duration, limitation, is_online, online_limitation, publish_at } = req.body

  // 檢查 course_id 是否隸屬該教室
  const courseFromDb = await StudioAdmin.getCourseById(course_id, studio.id)
  if (!courseFromDb) {
    req.flash('errorMessage', '沒有權限新增此課程')
    return res.redirect(`/${studio.subdomain}/admin/courseDetail/${courseDetailId}`)
  }

  // 檢查 duration, limitation, is_online, online_limitation 是否為數字
  if (isNaN(+duration) || +duration <= 0 || isNaN(+limitation) || isNaN(+is_online) || isNaN(+online_limitation)) {
    req.flash('errorMessage', '請檢查「時長」、「人數上限」、「開放線上」欄位')
    return res.redirect(`/${studio.subdomain}/admin/courseDetail/${courseDetailId}`)
  }

  // 檢查 is_online 和 online_limitation 狀態是否相符
  if (+is_online === 0 && +online_limitation > 0) {
    req.flash('errorMessage', '不開放線上課程時，「線上課程人數上限」須為 0')
    return res.redirect(`/${studio.subdomain}/admin/courseDetail/${courseDetailId}`)
  }
  if (+is_online === 1 && +online_limitation <= 0) {
    req.flash('errorMessage', '開放線上課程時，「線上課程人數上限」至少需 1 人')
    return res.redirect(`/${studio.subdomain}/admin/courseDetail/${courseDetailId}`)
  }

  // 寫入 db
  const publishAt = moment(publish_at).format('YYYY-MM-DD HH:mm:ss')
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  await StudioAdmin.updateCourseDetail(courseDetailId, date, start_time, duration, is_online, limitation, online_limitation, publishAt, currentTime)
  req.flash('successMessage', '課程更新成功！')
  return res.redirect(`/${studio.subdomain}/admin/courseDetail`)
}

const renderAllCourseDetails = async (req, res) => {
  const studio = req.user.studio
  const courseDetailList = await StudioAdmin.getStudioCourseDetail(studio.id)

  res.render('admin_studio/courseDetail', {
    studio,
    courseDetailList
  })
}






const renderCreateTeacherPage = async (req, res) => {
  const studio = req.user.studio
  const input = req.flash('createTeacherInput')[0]

  res.render('admin_studio/createTeacher', {
    studio,
    input
  })
}

const createTeacher = async (req, res) => {
  const studio = req.user.studio
  const { name, major, introduction } = req.body

  // 檢查前端資料，若不足則擋下
  if (!name || !major) {
    req.flash('createTeacherInput', req.body)
    req.flash('errorMessage', 'missing information')
    return res.redirect(`/${studio.subdomain}/admin/teacher/create`)
  }

  let avatar = null
  if (req.files.avatar) {
    avatar = await uploadFileToS3(req.files.avatar[0].path)
    avatar = avatar.key
    await unlinkFile(req.files.avatar[0].path)
  }

  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  await StudioAdmin.createTeacher(name, avatar, major, introduction, studio.id, currentTime)
  req.flash('successMessage', `${name} 老師建立成功`)
  return res.redirect(`/${studio.subdomain}/admin/teacher/create`)
}

const renderEditTeacherPage = async (req, res) => {
  const studio = req.user.studio
  const teacherId = req.params.teacherId
  const input = await StudioAdmin.getDedicatedTeacher(studio.id, teacherId)

  if (!input) {
    req.flash('errorMessage', '老師編號有誤')
    return res.redirect(`/${studio.subdomain}/admin/teacher`)
  }

  res.render('admin_studio/editTeacher', {
    studio,
    input
  })
}

const updateTeacher = async (req, res) => {
  const studio = req.user.studio
  const teacherId = req.params.teacherId
  const { name, major, introduction } = req.body

  // 檢查前端資料，若不足則擋下
  if (!name || !major) {
    req.flash('errorMessage', 'missing information')
    return res.redirect(`/${studio.subdomain}/admin/teacher/${teacherId}`)
  }

  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  if (req.files.avatar) { // 如果頭像有更新
    const avatar = req.files.avatar[0].path
    const avatarInS3 = await uploadFileToS3(avatar)
    await unlinkFile(avatar) // 把檔案從 images 資料夾刪除
    await StudioAdmin.updateTeacherWithAvatar(teacherId, name, avatarInS3.key, major, introduction, currentTime)
  } else { // 如果頭像沒有更新
    await StudioAdmin.updateTeacherWithoutAvatar(teacherId, name, major, introduction, currentTime)
  }

  req.flash('successMessage', `${name} 老師更新成功`)
  return res.redirect(`/${studio.subdomain}/admin/teacher`)
}

const renderAllTeachers = async (req, res) => {
  const studio = req.user.studio
  const teacherList = await Studio.getTeachers(studio.id)
  for (const teacher of teacherList) {
    teacher.avatar = process.env.AWS_CDN_DOMAIN + teacher.avatar
  }

  res.render('admin_studio/teacher', {
    studio,
    teacherList
  })
}






const renderEditAboutPage = async (req, res) => {
  const studio = req.user.studio
  const input = await Studio.getStudioForAbout(studio.subdomain)

  if (!input) {
    req.flash('errorMessage', '系統錯誤，請洽管理員')
    return res.redirect(`/${studio.subdomain}/admin`)
  }

  res.render('admin_studio/editAbout', {
    studio,
    input
  })
}

const updateAbout = async (req, res) => {
  const studio = req.user.studio

  // 檢查前端資料，若不足則擋下
  if (!requirementOfUpdateStudio.every(e => req.body[e] !== '')) {
    req.flash('errorMessage', 'missing information')
    return res.redirect(`/${studio.subdomain}/admin/about`)
  }

  // 整理資料
  const originStudioInfo = await Studio.getStudioForAbout(studio.subdomain)
  const { name, introduction_title, introduction_detail, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, tappay_app_id } = req.body

  let logo = req.files.logo ? req.files.logo[0].path : originStudioInfo.logo
  let introduction_photo = req.files.introduction_photo ? req.files.introduction_photo[0].path : originStudioInfo.introduction_photo
  if (req.files.logo) { // 如果 logo 有更新
    logo = await uploadFileToS3(req.files.logo[0].path)
    logo = logo.key
    await unlinkFile(req.files.logo[0].path)
  }
  if (req.files.introduction_photo) { // 如果 logo 有更新
    introduction_photo = await uploadFileToS3(req.files.introduction_photo[0].path)
    introduction_photo = introduction_photo.key
    await unlinkFile(req.files.introduction_photo[0].path)
  }
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')

  await StudioAdmin.updateStudio(studio.id, name, logo, introduction_title, introduction_detail, introduction_photo, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, tappay_app_id, currentTime)
  req.flash('successMessage', '資訊已更新')
  return res.redirect(`/${studio.subdomain}/admin/about`)
}












const renderLivePage = async (req, res, next) => {
  const studio = req.user.studio
  const { studioSubdomain } = req.params
  const courseDetailId = req.query.courseDetailId

  // 撈出課程資料（確認該堂課是不是該教室的）
  const courseDetail = await StudioAdmin.getCourseDetail(studioSubdomain, courseDetailId)
  if (!courseDetail) {
    return next()
  }

  // 檢查登入者是不是該堂課的老師(有沒有直播的權限)
  if (courseDetail.user_id !== req.user.id) {
    req.flash('errorMessage', 'Permission denied: 沒有直播權限')
    return res.redirect('/')
  }

  // 撈出註冊該堂課的學生
  const studentList = await StudioAdmin.getLivestreamStudents(courseDetailId)
  const studentIdList = []
  const studentNameList = []
  for (const each of studentList) {
    studentIdList.push(each.user_id)
    studentNameList.push(each.name)
  }

  res.render('admin_studio/livestream', {
    studio,
    studentIdList,
    studentNameList,
    courseDetailId
  })
}




module.exports = {
  renderHomePage,

  renderCreatePricePage,
  createPriceRule,
  renderEditPricePage,
  updatePriceRule,
  renderAllPriceRule,

  renderCreateCoursePage,
  createCourse,
  renderEditCoursePage,
  updateCourse,
  renderAllCourses,

  renderCreateCourseDetailPage,
  createCourseDetail,
  renderEditCourseDetailPage,
  updateCourseDetail,
  renderAllCourseDetails,

  renderCreateTeacherPage,
  createTeacher,
  renderEditTeacherPage,
  updateTeacher,
  renderAllTeachers,

  renderEditAboutPage,
  updateAbout,

  renderLivePage
}
