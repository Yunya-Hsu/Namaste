const router = require('express').Router()

// controllers
const Admin = require('../../controllers/admin_root_controller')

const { PERMISSION } = require('../../models/auth_model')

// middleware
const auth = require('../../middleware/auth')
const { upload, multerError } = require('../../middleware/multer')
const photoToS3 = require('../../middleware/s3')
const { verifyStudioInfo, verifyStudioForCreate } = require('../../middleware/verifyInput')

// utils
const { wrapAsync } = require('../../util/util')

// routers
router.get('/studio',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIOS),
  wrapAsync(Admin.renderCreateStudioPage)
)
router.post('/studio',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIOS),
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'introduction_photo', maxCount: 1 }
  ]),
  multerError,
  verifyStudioInfo,
  wrapAsync(verifyStudioForCreate),
  wrapAsync(photoToS3),
  wrapAsync(Admin.createStudio)
)

module.exports = router

