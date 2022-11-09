const router = require('express').Router()

// controllers
const Admin = require('../../controllers/admin_root_controller')

// middleware & utils
const upload = require('../../middleware/multer')
const auth = require('../../middleware/auth')
const { wrapAsync } = require('../../util/util')

// routers
router.get('/studio',
  auth.authenticated,
  auth.authRootAdmin,
  wrapAsync(Admin.renderCreateStudioPage)
)
router.post('/studio',
  auth.authenticated,
  auth.authRootAdmin,
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'introduction_photo', maxCount: 1 }
  ]),
  wrapAsync(Admin.createStudio)
)

module.exports = router

