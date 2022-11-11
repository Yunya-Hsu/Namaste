/* eslint-disable camelcase */
const moment = require('moment-timezone')

// models
const StudioAdmin = require('../models/admin_studio_model')

// basic parameters
const requirementOfPriceRule = ['category', 'price', 'point', 'term', 'publish_at']
const requirementOfCourse = ['title', 'teacher_id', 'user', 'point', 'publish_at']
const requirementOfCourseDetail = ['date', 'start_time', 'duration', 'limitation', 'is_online', 'online_limitation', 'publish_at']

const renderHomePage = async (req, res) => {
  const { studioSubdomain } = req.params
  if (!studioSubdomain) {
    return res.redirect('/')
  }

  res.send(`<h1>This is ${studioSubdomain} home page, 後台</h1>`)
}

const renderPricePage = async (req, res) => {
  const studio = req.user.studio
  const input = req.flash('createPriceRoleInput')[0]

  res.render('admin_studio/price', {
    studio,
    input
  })
}

const createPriceRule = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { category, price, point, remark, term, publish_at } = req.body
  const studio = req.user.studio

  // 檢查前端資料，若不足則擋下
  if (!requirementOfPriceRule.every(e => req.body[e] !== '')) {
    req.flash('createPriceRoleInput', req.body)
    req.flash('errorMessage', 'missing information')
    return res.redirect(`/${studio.subdomain}/admin/price`)
  }

  // check if price, point, term are numbers
  if (isNaN(+price) || isNaN(+point) || isNaN(+term)) {
    req.flash('createPriceRoleInput', req.body)
    req.flash('errorMessage', '價格、點數、使用期限必須為「數字」')
    return res.redirect(`/${studio.subdomain}/admin/price`)
  }

  // insert data
  const publishAt = moment(publish_at).format('YYYY-MM-DD HH:mm:ss')
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  await StudioAdmin.createPriceRule(studio.id, category, price, point, remark, term, publishAt, currentTime, currentTime)
  req.flash('successMessage', 'Price rule is created')
  res.redirect(`/${studio.subdomain}/admin/price`)
}

const renderCoursePage = async (req, res) => {
  const studio = req.user.studio
  const input = req.flash('createCourseInput')[0]

  // 撈出該教室的 teacher 清單
  const teacherList = await StudioAdmin.getStudioTeachers(studio.id)
  studio.teacherList = teacherList

  res.render('admin_studio/course', {
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
    return res.redirect(`/${studio.subdomain}/admin/course`)
  }

  const { title, description, teacher_id, livestream_email, point } = req.body

  // 檢查 point 是否為數字
  if (isNaN(+point)) {
    req.flash('createCourseInput', req.body)
    req.flash('errorMessage', '點數必須為「數字」')
    return res.redirect(`/${studio.subdomain}/admin/course`)
  }

  // 檢查 teacher_id 是否可使用（隸屬該教室）
  const validateTeacher = await StudioAdmin.validateStudioTeacher(+teacher_id, studio.id)
  if (validateTeacher.length <= 0) {
    req.flash('createCourseInput', req.body)
    req.flash('errorMessage', '授課教師不正確')
    return res.redirect(`/${studio.subdomain}/admin/course`)
  }

  // 檢查直播人員帳號是否存在
  const livestreamAccount = await StudioAdmin.validateLivestreamAccount(livestream_email)
  if (!livestreamAccount) {
    req.flash('createCourseInput', req.body)
    req.flash('errorMessage', '直播人員帳號錯誤')
    return res.redirect(`/${studio.subdomain}/admin/course`)
  }

  // 寫入 db
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  await StudioAdmin.createCourse(title, description, teacher_id, studio.id, livestreamAccount.id, point, currentTime)
  req.flash('successMessage', 'Course is created')
  return res.redirect(`/${studio.subdomain}/admin/course`)
}

const renderCourseDetailPage = async (req, res) => {
  const studio = req.user.studio
  const input = req.flash('createCourseDetailInput')[0]

  // 撈出該教室的 course 清單
  const courseList = await StudioAdmin.getStudioCourses(studio.id)
  studio.courseList = courseList

  res.render('admin_studio/courseDetail', {
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

const renderTeacherPage = async (req, res) => {
  const { studioSubdomain } = req.params

  res.send(`<h1>This is ${studioSubdomain} teacher page, 後台</h1>`)
}

const renderLivePage = async (req, res) => {
  // 測試網址
  // http://localhost:3000/todayYoga/admin/live?courseDetailId=1
  const { studioSubdomain } = req.params
  const courseDetailId = req.query.courseDetailId

  // 撈出課程資料（確認該堂課是不是該教室的）
  const courseDetail = await StudioAdmin.getCourseDetail(studioSubdomain, courseDetailId)
  if (!courseDetail) {
    return res.redirect('/404.html') // FIXME:
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
    studentIdList,
    studentNameList,
    courseDetailId
  })
}




module.exports = {
  renderHomePage,
  renderPricePage,
  createPriceRule,
  renderCoursePage,
  createCourse,
  renderCourseDetailPage,
  createCourseDetail,
  renderTeacherPage,
  renderLivePage
}
