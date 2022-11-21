const express = require('express')
const router = express.Router()

// router modules
const adminRoot = require('./modules/admin_root')
const user = require('./modules/user')

const { PERMISSION } = require('../models/auth_model')

// controllers
const AdminRoot = require('../controllers/admin_root_controller')
const AdminStudio = require('../controllers/admin_studio_controller')
const Studio = require('../controllers/studio_controller')

// middleware & utils
const auth = require('../middleware/auth')
const { wrapAsync } = require('../util/util')
const upload = require('../middleware/multer')






// routers
router.use('/admin', adminRoot)
router.use('/user', user)



// studio owner & assistant
router.get('/:studioSubdomain/admin/live',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_PRICE_RULES), // FIXME:
  wrapAsync(AdminStudio.renderLivePage)
)



// 建立價格頁面
router.get('/:studioSubdomain/admin/price/create',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_PRICE_RULES),
  wrapAsync(AdminStudio.renderCreatePricePage)
)

// 建立價格
router.post('/:studioSubdomain/admin/price/create',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_PRICE_RULES),
  wrapAsync(AdminStudio.createPriceRule)
)

// 編輯價格頁面
router.get('/:studioSubdomain/admin/price/:priceRuleId',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_STUDIO_PRICE_RULES),
  wrapAsync(AdminStudio.renderEditPricePage)
)

// 送出價格更新
router.put('/:studioSubdomain/admin/price/:priceRuleId',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_STUDIO_PRICE_RULES),
  wrapAsync(AdminStudio.updatePriceRule)
)

// 價格一覽
router.get('/:studioSubdomain/admin/price',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.renderAllPriceRule)
)





// 建立 course 頁面
router.get('/:studioSubdomain/admin/course/create',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.renderCreateCoursePage)
)

// 建立 course
router.post('/:studioSubdomain/admin/course/create',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.createCourse)
)

// 編輯 course 頁面
router.get('/:studioSubdomain/admin/course/:courseId',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.renderEditCoursePage)
)

// 送出 course 更新
router.put('/:studioSubdomain/admin/course/:courseId',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.updateCourse)
)

// course 一覽
router.get('/:studioSubdomain/admin/course',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.renderAllCourses)
)








// 建立 course_detail 頁面
router.get('/:studioSubdomain/admin/courseDetail/create',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.renderCreateCourseDetailPage)
)

// 建立 course_detail
router.post('/:studioSubdomain/admin/courseDetail/create',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.createCourseDetail)
)

// 編輯 course_detail 頁面
router.get('/:studioSubdomain/admin/courseDetail/:courseDetailId',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.renderEditCourseDetailPage)
)

// 送出 course 更新
router.put('/:studioSubdomain/admin/courseDetail/:courseDetailId',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.updateCourseDetail)
)

// course_detail 一覽
router.get('/:studioSubdomain/admin/courseDetail',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.renderAllCourseDetails)
)





// 建立 teacher 頁面
router.get('/:studioSubdomain/admin/teacher/create',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_TEACHER),
  wrapAsync(AdminStudio.renderCreateTeacherPage)
)

// 建立 teacher
router.post('/:studioSubdomain/admin/teacher/create',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_TEACHER),
  upload.fields([
    { name: 'avatar', maxCount: 1 }
  ]),
  wrapAsync(AdminStudio.createTeacher)
)

// 編輯 teacher 頁面
router.get('/:studioSubdomain/admin/teacher/:teacherId',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_STUDIO_TEACHER),
  wrapAsync(AdminStudio.renderEditTeacherPage)
)

// 送出 teacher 更新
router.put('/:studioSubdomain/admin/teacher/:teacherId',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_STUDIO_TEACHER),
  upload.fields([
    { name: 'avatar', maxCount: 1 }
  ]),
  wrapAsync(AdminStudio.updateTeacher)
)

// teacher 一覽
router.get('/:studioSubdomain/admin/teacher',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_STUDIO_TEACHER),
  wrapAsync(AdminStudio.renderAllTeachers)
)








router.get('/:studioSubdomain/admin/about',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_DEDICATED_STUDIO),
  wrapAsync(AdminStudio.renderEditAboutPage)
)

router.put('/:studioSubdomain/admin/about',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_DEDICATED_STUDIO),
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'introduction_photo', maxCount: 1 }
  ]),
  wrapAsync(AdminStudio.updateAbout)
)






router.get('/:studioSubdomain/admin',
  auth.authenticated,
  auth.authorization(PERMISSION.UPDATE_DEDICATED_STUDIO),
  wrapAsync(AdminStudio.renderHomePage)
)








// users
router.get('/:studioSubdomain/live',
  auth.authenticated,
  wrapAsync(Studio.renderLivePage)
)
router.get('/:studioSubdomain/checkout',
  auth.authenticated,
  wrapAsync(Studio.renderCheckoutPage)
)
router.post('/:studioSubdomain/checkout',
  auth.authenticated,
  wrapAsync(Studio.checkout)
)
router.get('/:studioSubdomain/price', wrapAsync(Studio.renderPricePage))
router.get('/:studioSubdomain/course', wrapAsync(Studio.renderCoursePage))
router.get('/:studioSubdomain/about', wrapAsync(Studio.renderAboutPage))
router.get('/:studioSubdomain/registration',
  auth.authenticated,
  wrapAsync(Studio.registerCourse)
)
router.get('/:studioSubdomain', wrapAsync(Studio.renderHomePage))





router.get('/', wrapAsync(AdminRoot.renderNamasteHomePage))

module.exports = router
