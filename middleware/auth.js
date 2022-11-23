const Auth = require('../models/auth_model')
const Studio = require('../models/studio_model')

const authenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('errorMessage', 'Please login')
    return res.redirect('/user/login')
  }

  next()
}



const authorization = permissionId => {
  return async function (req, res, next) {
    try {
      const { studioSubdomain } = (req.params.studioSubdomain === undefined) ? { studioSubdomain: 'yogaWithLucie' } : req.params // FIXME: root 建立在 studio #1 裡面
      const studio = await Studio.getStudioBySubdomain(studioSubdomain)
      const roleList = await Auth.getUserRoles(req.user.id)

      const verifyResult = roleList.some(element => {
        return element.studio_id === studio.id && element.permission_id === permissionId
      })

      if (!verifyResult) {
        req.flash('errorMessage', 'Permission denied')
        return res.redirect('/')
      }

      studio.logo = process.env.AWS_CDN_DOMAIN + studio.logo
      req.user.studio = studio
      next()
    } catch (error) {
      req.flash('errorMessage', 'Permission denied')
      return res.redirect('/')
    }
  }
}





module.exports = {
  authenticated,
  authorization
}
