// models
const StudioAdmin = require('../models/admin_studio_model')



const renderHomePage = async (req, res) => {
  const { studioSubdomain } = req.params
  if (!studioSubdomain) {
    return res.redirect('/')
  }

  res.send(`<h1>This is ${studioSubdomain} home page, 後台</h1>`)
}

const renderPricePage = async (req, res) => {
  const { studioSubdomain } = req.params

  res.send(`<h1>This is ${studioSubdomain} price page, 後台</h1>`)
}

const renderCoursePage = async (req, res) => {
  const { studioSubdomain } = req.params

  res.send(`<h1>This is ${studioSubdomain} course page, 後台</h1>`)
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
  renderCoursePage,
  renderTeacherPage,
  renderLivePage
}
