/* eslint-disable camelcase */
const moment = require('moment')

// models
const Admin = require('../models/admin_root_model')

// basic parameters
const studio = require('../models/namaste_parameters')
const requirementOfCreateStudio = ['name', 'subdomain', 'manager', 'address', 'tappay_app_key', 'tappay_partner_key', 'tappay_id']



const renderCreateStudioPage = (req, res) => {
  const input = req.flash('createStudioInput')[0]

  return res.render('admin_root/studio', { studio, input })
}

const createStudio = async (req, res) => {
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

  // check if manager account is validate
  const managerRoleId = await Admin.findRoleIdByEmail(req.body.manager)
  if (managerRoleId === null) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', `${req.body.manager} does not exist`)
    return res.redirect('/admin/studio')
  } else if (managerRoleId !== 1) {
    req.flash('createStudioInput', req.body)
    req.flash('errorMessage', 'this user is not boss')
    return res.redirect('/admin/studio')
  }

  // insert into db
  const { name, introduction_title, introduction_detail, subdomain, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id } = req.body
  const logo = req.files.logo[0].path
  const introduction_photo = req.files.introduction_photo ? req.files.introduction_photo[0].path : null
  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')

  await Admin.createStudio(name, introduction_title, introduction_detail, subdomain, managerRoleId, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, logo, introduction_photo, currentTime, currentTime)
  req.flash('successMessage', `Create studio: ${name} successfully`)
  return res.redirect('/admin/studio')
}

module.exports = {
  renderCreateStudioPage,
  createStudio
}
