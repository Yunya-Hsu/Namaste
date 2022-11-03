// models
const Studio = require('../models/studio_model')

const renderHomePage = async (req, res) => {
  // search studio from DB
  const { studioSubdomain } = req.params
  const studio = await Studio.getStudioBySubdomain(studioSubdomain)
  if (!studio) {
    return res.redirect('/404.html') // FIXME:
  }

  // render studio
  res.render('studio/home', { studio })
}

const renderPricePage = (req, res) => {
  const { studioName } = req.params

  res.send(`<h1 style="color: pink">This is ${studioName} price page</h1>`)
}

const renderCoursePage = (req, res) => {
  const { studioName } = req.params

  res.send(`<h1 style="color: pink">This is ${studioName} course page</h1>`)
}

const renderTeacherPage = (req, res) => {
  const { studioName } = req.params

  res.send(`<h1 style="color: pink">This is ${studioName} teacher page</h1>`)
}







const renderLivePage = async (req, res) => {
  // 測試網址
  // http://localhost:3000/todayYoga/live?courseDetailId=123
  const { studioName } = req.params
  const studio = await Studio.getStudioBySubdomain(studioName)
  if (!studio) {
    return res.redirect('/404.html') // FIXME:
  }

  // 確認登入者是否有註冊此課程
  const courseDetailId = req.query.courseDetailId
  const result = Studio.checkRegistration(req.user_id, courseDetailId)
  if (!result) {
    return res.back()
  }


  res.send('This is student live page')
}


module.exports = {
  renderHomePage,
  renderPricePage,
  renderCoursePage,
  renderTeacherPage,
  renderLivePage
}
