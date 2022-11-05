// models
const StudioAdmin = require('../models/admin_studio_model')
const Studio = require('../models/studio_model')

const renderHomePage = async (req, res) => {
  // search studio from DB
  const { studioSubdomain } = req.params
  const studio = await Studio.getStudioBySubdomain(studioSubdomain) // FIXME:
  if (!studio) {
    return res.redirect('/404.html') // FIXME:
  }

  res.render('studio/home', { studio })
}

const renderPricePage = async (req, res) => {
  const { studioName } = req.params

  res.send(`<h1 style="color: pink">This is ${studioName} price page</h1>`)
}

const renderCoursePage = async (req, res) => {
  const { studioName } = req.params

  res.send(`<h1 style="color: pink">This is ${studioName} course page</h1>`)
}

const renderTeacherPage = async (req, res) => {
  const { studioName } = req.params

  res.send(`<h1 style="color: pink">This is ${studioName} teacher page</h1>`)
}







const renderLivePage = async (req, res) => {
  // 測試網址
  // http://localhost:3000/todayYoga/live?courseDetailId=1
  const { studioSubdomain } = req.params
  const courseDetailId = req.query.courseDetailId
  const userId = req.user.id

  // 撈出課程資料（確認該堂課是不是該教室的）
  const courseDetail = await StudioAdmin.getCourseDetail(studioSubdomain, courseDetailId)
  if (!courseDetail) {
    return res.redirect('/404.html') // FIXME:
  }


  // 檢查登入者有沒有註冊此課程
  const verifyRegistration = await Studio.verifyRegistration(userId, courseDetailId, studioSubdomain)
  if (!verifyRegistration) {
    req.flash('errorMessage', 'Permission denied: 未註冊此課程')
    return res.redirect('/')
  }


  res.render('studio/livestream', {
    courseDetailId,
    userId
  })
}


module.exports = {
  renderHomePage,
  renderPricePage,
  renderCoursePage,
  renderTeacherPage,
  renderLivePage
}
