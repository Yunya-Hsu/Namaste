const router = require('express').Router()

// controllers
const AdminStudio = require('../../controllers/admin_studio_controller')

// permission
const { PERMISSION } = require('../../models/auth_model')

// middleware
const { upload, multerError } = require('../../middleware/multer')
const { authorization } = require('../../middleware/auth')
const { verifyPriceRule, verifyCourse, verifyCourseDetail, verifyTeacher } = require('../../middleware/verifyInput')
const { avatarToS3 } = require('../../middleware/s3')

// utils
const { wrapAsync } = require('../../util/util')


router.get('/price/create', authorization(PERMISSION.CREATE_STUDIO_PRICE_RULES), wrapAsync(AdminStudio.renderCreatePricePage))
router.post('/price/create', authorization(PERMISSION.CREATE_STUDIO_PRICE_RULES), verifyPriceRule, wrapAsync(AdminStudio.createPriceRule))
router.get('/price/:priceRuleId', authorization(PERMISSION.UPDATE_STUDIO_PRICE_RULES), wrapAsync(AdminStudio.renderEditPricePage))
router.put('/price/:priceRuleId', authorization(PERMISSION.UPDATE_STUDIO_PRICE_RULES), verifyPriceRule, wrapAsync(AdminStudio.updatePriceRule))
router.get('/price', authorization(PERMISSION.UPDATE_STUDIO_PRICE_RULES), wrapAsync(AdminStudio.renderAllPriceRule))

router.get('/course/create', authorization(PERMISSION.CREATE_STUDIO_COURSE), wrapAsync(AdminStudio.renderCreateCoursePage))
router.post('/course/create', authorization(PERMISSION.CREATE_STUDIO_COURSE), verifyCourse, wrapAsync(AdminStudio.createCourse))
router.get('/course/:courseId', authorization(PERMISSION.UPDATE_STUDIO_COURSE), wrapAsync(AdminStudio.renderEditCoursePage))
router.put('/course/:courseId', authorization(PERMISSION.UPDATE_STUDIO_COURSE), verifyCourse, wrapAsync(AdminStudio.updateCourse))
router.get('/course', authorization(PERMISSION.UPDATE_STUDIO_COURSE), wrapAsync(AdminStudio.renderAllCourses))

router.get('/courseDetail/create', authorization(PERMISSION.CREATE_STUDIO_COURSE), wrapAsync(AdminStudio.renderCreateCourseDetailPage))
router.post('/courseDetail/create', authorization(PERMISSION.CREATE_STUDIO_COURSE), verifyCourseDetail, wrapAsync(AdminStudio.createCourseDetail))
router.get('/courseDetail/:courseDetailId', authorization(PERMISSION.UPDATE_STUDIO_COURSE), wrapAsync(AdminStudio.renderEditCourseDetailPage))
router.put('/courseDetail/:courseDetailId', authorization(PERMISSION.UPDATE_STUDIO_COURSE), verifyCourseDetail, wrapAsync(AdminStudio.updateCourseDetail))
router.get('/courseDetail', authorization(PERMISSION.UPDATE_STUDIO_COURSE), wrapAsync(AdminStudio.renderAllCourseDetails))

router.get('/teacher/create', authorization(PERMISSION.CREATE_STUDIO_TEACHER), wrapAsync(AdminStudio.renderCreateTeacherPage))
router.post('/teacher/create',
  authorization(PERMISSION.CREATE_STUDIO_TEACHER),
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  multerError,
  verifyTeacher,
  wrapAsync(avatarToS3),
  wrapAsync(AdminStudio.createTeacher)
)
router.get('/teacher/:teacherId', authorization(PERMISSION.UPDATE_STUDIO_TEACHER), wrapAsync(AdminStudio.renderEditTeacherPage))
router.put('/teacher/:teacherId',
  authorization(PERMISSION.UPDATE_STUDIO_TEACHER),
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  multerError,
  verifyTeacher,
  wrapAsync(avatarToS3),
  wrapAsync(AdminStudio.updateTeacher)
)
router.get('/teacher', authorization(PERMISSION.UPDATE_STUDIO_TEACHER), wrapAsync(AdminStudio.renderAllTeachers))

router.get('/about', authorization(PERMISSION.UPDATE_DEDICATED_STUDIO), wrapAsync(AdminStudio.renderEditAboutPage))
router.put('/about',
  authorization(PERMISSION.UPDATE_DEDICATED_STUDIO),
  upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'introduction_photo', maxCount: 1 }]),
  multerError,
  wrapAsync(AdminStudio.updateAbout)
)

router.get('/:livestreamType', wrapAsync(AdminStudio.renderLivePage))

router.get('/', authorization(PERMISSION.UPDATE_DEDICATED_STUDIO), wrapAsync(AdminStudio.renderHomePage))


module.exports = router
