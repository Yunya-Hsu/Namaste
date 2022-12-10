const { UserPermission } = require('../services/studio_service')

const authenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('errorMessage', '請先登入')
    return res.redirect('/user/login')
  }

  next()
}

const authorization = permissionId => {
  return async function (req, res, next) {
    try {
      let userPermission
      if (req.studio === undefined) {
        userPermission = new UserPermission(req.user.id, 1)
      } else {
        userPermission = new UserPermission(req.user.id, req.studio.id)
      }
      const verifyResult = await userPermission.authorize(permissionId)
      if (!verifyResult) {
        req.flash('errorMessage', '無瀏覽權限')
        return res.redirect('/')
      }
      next()
    } catch (error) {
      req.flash('errorMessage', '無瀏覽權限')
      return res.redirect('/')
    }
  }
}



module.exports = {
  authenticated,
  authorization
}
