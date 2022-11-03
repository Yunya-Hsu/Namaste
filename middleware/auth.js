const Auth = require('../models/auth')

const authenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('errorMessage', 'Please login')
    return res.redirect('/user/login')
  }

  next()
}

const authLivestream = async (req, res, next) => {
  const roleId = req.user.role_id
  const result = await Auth.validateLivestream(roleId)

  if (!result) {
    req.flash('errorMessage', 'Permission denied')
    return res.redirect('/')
  }

  next()
}

const authCRUDStudios = async (req, res, next) => {
  const roleId = req.user.role_id
  const result = await Auth.validateCrudStudios(roleId)

  if (!result) {
    req.flash('errorMessage', 'Permission denied')
    return res.redirect('/')
  }

  next()
}

module.exports = {
  authenticated,
  authLivestream,
  authCRUDStudios
}
