const Auth = require('../models/auth')

const authenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('errorMessage', 'Please login')
    return res.redirect('/user/login')
  }

  next()
}


const authRootAdmin = async (req, res, next) => {
  const roleId = req.user.role_id
  const result = await Auth.validateCrudStudios(roleId)

  if (!result) {
    req.flash('errorMessage', 'Permission denied')
    return res.redirect('/')
  }

  req.user.studio = result
  next()
}

const authDedicatedStudio = async (req, res, next) => {
  const { studioSubdomain } = req.params
  const userId = req.user.id
  const result = await Auth.validateCRUDStudioPrice(studioSubdomain, userId)

  if (!result) {
    req.flash('errorMessage', 'Permission denied')
    return res.redirect('/')
  }

  result.subdomain = studioSubdomain
  req.user.studio = result
  next()
}

module.exports = {
  authenticated,
  authRootAdmin,
  authDedicatedStudio
}
