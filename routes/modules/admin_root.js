const router = require('express').Router()

// controllers
const Admin = require('../../controllers/admin_root_controller')

// middleware
const upload = require('../../middleware/multer')
const { authenticated } = require('../../middleware/auth')

// routers
router.get('/studio', authenticated, Admin.renderCreateStudioPage)
router.post('/studio',
  authenticated,
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'introduction_photo', maxCount: 1 }
  ]),
  Admin.createStudio
)

module.exports = router

