const router = require('express').Router()

// controllers
const Admin = require('../../controllers/admin_controller')

// middleware
const upload = require('../../middleware/multer')

// routers
router.get('/studio', Admin.renderCreateStudioPage)
router.post('/studio',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'introduction_photo', maxCount: 1 }
  ]),
  Admin.createStudio
)

module.exports = router

