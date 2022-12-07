// services
const { StudioDetail } = require('../services/studio_service')

const verifyStudio = async (req, res, next) => {
  const studio = new StudioDetail(req)
  await studio.getStudioBySubdomain()
  if (!studio.logo) {
    return res.render('basic/404')
  }

  req.studio = studio
  next()
}

module.exports = verifyStudio
