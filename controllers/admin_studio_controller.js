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

// services
const { PriceRule, Course, CourseDetail } = require('../services/studio_admin_service')


// basic parameters
const requirementOfUpdateStudio = ['name', 'address', 'tappay_app_key', 'tappay_partner_key', 'tappay_id', 'tappay_app_id']



// FIXME:
const renderHomePage = async (req, res) => {
  const studio = req.user.studio

  const thisMonday = moment().tz('Asia/Taipei').day('Monday').format('YYYY-MM-DD')
  const thisSunday = moment().tz('Asia/Taipei').day('Monday').add('7', 'days').format('YYYY-MM-DD')
  const today = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  const startOfMonth = moment().tz('Asia/Taipei').startOf('month').format('YYYY-MM-DD HH:mm:ss')
  const endOfMonth = moment().tz('Asia/Taipei').endOf('month').format('YYYY-MM-DD HH:mm:ss')


  let monthlyProfit = await StudioAdmin.getMonthlyProfit(studio.id, startOfMonth, endOfMonth)
  monthlyProfit = monthlyProfit.monthlyProfit !== null ? monthlyProfit.monthlyProfit : 0
  const monthlyProfitGroupByRules = await StudioAdmin.getMonthlyProfitGroupByRules(studio.id, startOfMonth, endOfMonth)
  const onlineCourseList = await StudioAdmin.getThisWeekOnlineCourses(studio.id, thisMonday, thisSunday, today)

  res.render('admin_studio/home', {
    studio,
    monthlyProfit,
    monthlyProfitGroupByRules,
    onlineCourseList
  })
}





const renderCreatePricePage = async (req, res) => {
  const input = req.flash('createPriceRoleInput')[0]
  res.render('admin_studio/createPrice', {
    studio: req.studio,
    input
  })
}

const createPriceRule = async (req, res) => {
  const priceRule = new PriceRule(req)
  await priceRule.create(req.studio.id)
  req.flash('successMessage', '價格規則已成功建立')
  res.redirect(`/${req.studio.subdomain}/admin/price`)
}

const renderEditPricePage = async (req, res) => {
  const priceRule = new PriceRule(req)
  const input = await priceRule.getOne(req.studio.id)

  if (!input) {
    req.flash('errorMessage', '價格編號有誤')
    return res.redirect(`/${req.studio.subdomain}/admin/price`)
  }

  res.render('admin_studio/editPrice', {
    studio: req.studio,
    input
  })
}

const updatePriceRule = async (req, res) => {
  const priceRule = new PriceRule(req)
  await priceRule.update()

  req.flash('successMessage', `「${priceRule.category}」已更新`)
  res.redirect(`/${req.studio.subdomain}/admin/price`)
}

const renderAllPriceRule = async (req, res) => {
  const priceRuleList = await PriceRule.getAll(req.studio.id)
  res.render('admin_studio/priceRule', {
    studio: req.studio,
    priceRuleList
  })
}







const renderCreateCoursePage = async (req, res) => {
  const input = req.flash('createCourseInput')[0]

  req.studio.teacherList = await Course.getTeachers(req.studio.id)
  res.render('admin_studio/createCourse', {
    studio: req.studio,
    input
  })
}

const createCourse = async (req, res) => {
  const course = new Course(req)
  await course.create(req.studio.id)
  req.flash('successMessage', '課程已建立')
  return res.redirect(`/${req.studio.subdomain}/admin/course/create`)
}

const renderEditCoursePage = async (req, res) => {
  const course = new Course(req)
  const input = await course.getOne(req.studio.id)
  if (!input) {
    req.flash('errorMessage', '課程編號有誤')
    return res.redirect(`/${req.studio.subdomain}/admin/course`)
  }

  req.studio.teacherList = await Course.getTeachers(req.studio.id)
  res.render('admin_studio/editCourse', {
    studio: req.studio,
    input
  })
}

const updateCourse = async (req, res) => {
  const course = new Course(req)
  await course.update(req.studio.id)
  req.flash('successMessage', `「${course.title}」 已更新`)
  res.redirect(`/${req.studio.subdomain}/admin/course`)
}

const renderAllCourses = async (req, res) => {
  const courseList = await Course.getAll(req.studio.id)
  res.render('admin_studio/course', {
    studio: req.studio,
    courseList
  })
}






const renderCreateCourseDetailPage = async (req, res) => {
  req.studio.courseList = await CourseDetail.getCourseList(req.studio.id)
  const input = req.flash('createCourseDetailInput')[0]
  res.render('admin_studio/createCourseDetail', {
    studio: req.studio,
    input
  })
}

const createCourseDetail = async (req, res) => {
  const courseDetail = new CourseDetail(req)
  await courseDetail.create(req.studio.id)
  req.flash('successMessage', '課程上架成功！')
  return res.redirect(`/${req.studio.subdomain}/admin/courseDetail`)
}

const renderEditCourseDetailPage = async (req, res) => {
  const courseDetail = new CourseDetail(req)
  const input = await courseDetail.getOne(req.studio.id)
  if (!input) {
    req.flash('errorMessage', '課程編號有誤')
    return res.redirect(`/${req.studio.subdomain}/admin/courseDetail`)
  }
  res.render('admin_studio/editCourseDetail', {
    studio: req.studio,
    input
  })
}

const updateCourseDetail = async (req, res) => {
  const courseDetail = new CourseDetail(req)
  await courseDetail.update()
  req.flash('successMessage', '課程更新成功！')
  return res.redirect(`/${req.studio.subdomain}/admin/courseDetail`)
}

const renderAllCourseDetails = async (req, res) => {
  const courseDetailList = await CourseDetail.getAll(req.studio.id)
  res.render('admin_studio/courseDetail', {
    studio: req.studio,
    courseDetailList
  })
}






const renderCreateTeacherPage = async (req, res) => {
  const input = req.flash('createTeacherInput')[0]

  res.render('admin_studio/createTeacher', {
    studio: req.studio,
    input
  })
}

const createTeacher = async (req, res) => {
  const studio = req.user.studio
  const { name, major, introduction } = req.body

  // 檢查前端資料，若不足則擋下
  if (!name || !major) {
    req.flash('createTeacherInput', req.body)
    req.flash('errorMessage', '缺少必須資訊，請重新檢查')
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
  const teacherId = req.params.teacherId
  const input = await StudioAdmin.getDedicatedTeacher(req.studio.id, teacherId)

  if (!input) {
    req.flash('errorMessage', '老師編號有誤')
    return res.redirect(`/${req.studio.subdomain}/admin/teacher`)
  }

  res.render('admin_studio/editTeacher', {
    studio: req.studio,
    input
  })
}

const updateTeacher = async (req, res) => {
  const studio = req.user.studio
  const teacherId = req.params.teacherId
  const { name, major, introduction } = req.body

  // 檢查前端資料，若不足則擋下
  if (!name || !major) {
    req.flash('errorMessage', '缺少必須資訊，請重新檢查')
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
    studio: req.studio,
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
    studio: req.studio,
    input
  })
}

const updateAbout = async (req, res) => {
  const studio = req.user.studio

  // 檢查前端資料，若不足則擋下
  if (!requirementOfUpdateStudio.every(e => req.body[e] !== '')) {
    req.flash('errorMessage', '缺少必須資訊，請重新檢查')
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
  req.flash('successMessage', '教室資訊已更新')
  return res.redirect(`/${studio.subdomain}/admin/about`)
}












const renderLivePage = async (req, res, next) => {
  const livestreamPage = {
    live: 'admin_studio/livestream',
    oneOnOne: 'admin_studio/oneOnOne'
  }
  const { livestreamType } = req.params
  const courseDetailId = req.query.courseDetailId

  // 撈出課程資料（確認該堂課是不是該教室的）
  const courseDetail = await StudioAdmin.getCourseDetail(req.studio.subdomain, courseDetailId)
  if (!courseDetail) {
    return next()
  }

  // 檢查登入者是不是該堂課的老師(有沒有直播的權限)
  if (courseDetail.user_id !== req.user.id) {
    req.flash('errorMessage', '沒有直播權限')
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

  res.render(livestreamPage[livestreamType], {
    studio: req.studio,
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
