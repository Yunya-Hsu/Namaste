const router = require('express').Router()

// controllers
const Admin = require('../../controllers/admin_root_controller')

// middleware & utils
const upload = require('../../middleware/multer')
const { authenticated, authCRUDStudios } = require('../../middleware/auth')
const { wrapAsync } = require('../../util/util')

// routers
router.get('/studio',
  authenticated,
  authCRUDStudios,
  wrapAsync(Admin.renderCreateStudioPage)
)
router.post('/studio',
  authenticated,
  authCRUDStudios,
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'introduction_photo', maxCount: 1 }
  ]),
  wrapAsync(Admin.createStudio)
)

module.exports = router

