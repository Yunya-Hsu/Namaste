/* eslint-disable camelcase */
const moment = require('moment-timezone')

// models
const Admin = require('../models/admin_root_model')
const User = require('../models/user_model')

// basic parameters
const studio = require('../models/namaste_parameters')
const requirementOfCreateStudio = ['name', 'subdomain', 'manager', 'address', 'tappay_app_key', 'tappay_partner_key', 'tappay_id', 'tappay_app_id']



const renderCreateStudioPage = async (req, res, next) => {
  const input = req.flash('createStudioInput')[0]
  return res.render('admin_root/studio', { studio, input })
}

const createStudio = async (req, res, next) => {
  // 檢查前端資料，若不足則擋下
  if (!req.files.logo || !requirementOfCreateStudio.every(e => req.body[e] !== '')) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', 'missing information')
    return res.redirect('/admin/studio')
  }

  // check if subdomain unique
  const checkSubdomainResult = await Admin.checkSubdomain(req.body.subdomain)
  if (checkSubdomainResult.length > 0) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', 'subdomain is duplicate')
    return res.redirect('/admin/studio')
  }

  // FIXME: validate subdomain formate

  // 取得 manager 的 id
  const manager = await User.findUserByEmail(req.body.manager)
  if (!manager) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', `${req.body.manager} does not exist`)
    return res.redirect('/admin/studio')
  }

  // 整理資料
  const { name, introduction_title, introduction_detail, subdomain, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, tappay_app_id } = req.body
  const logo = req.files.logo[0].path
  const introduction_photo = req.files.introduction_photo ? req.files.introduction_photo[0].path : null
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')

  // insert into db
  await Admin.createStudio(name, introduction_title, introduction_detail, subdomain, manager.id, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, tappay_app_id, logo, introduction_photo, currentTime, currentTime)
  req.flash('successMessage', `Studio ${name} is created.`)
  return res.redirect('/admin/studio')
}

const renderNamasteHomePage = async (req, res, next) => {
  const studioList = await Admin.getStudios()
  for (const studio of studioList) {
    studio.logo = process.env.SERVER_IP + studio.logo
  }
  res.render('home', { studioList })
}

module.exports = {
  renderCreateStudioPage,
  createStudio,
  renderNamasteHomePage
}
