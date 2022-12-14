// class
const { StudioInfo } = require('../services/studio_admin_service')

// models
const Admin = require('../models/admin_root_model')

// basic parameters
const studio = require('../models/namaste_parameters')


const renderCreateStudioPage = async (req, res, next) => {
  const input = req.flash('createStudioInput')[0]
  return res.render('admin_root/studio', { studio, input })
}

const createStudio = async (req, res, next) => {
  const studioInfo = new StudioInfo(req)
  await studioInfo.create()
  req.flash('successMessage', `Studio ${studioInfo.name} 已成功建立！`)
  return res.redirect('/admin/studio')
}

const renderNamasteHomePage = async (req, res, next) => {
  const studioList = await Admin.getStudios()
  for (const studio of studioList) {
    studio.logo = process.env.AWS_CDN_DOMAIN + studio.logo
  }
  res.render('home', { studioList })
}

module.exports = {
  renderCreateStudioPage,
  createStudio,
  renderNamasteHomePage
}
