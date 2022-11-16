const express = require('express')
const router = express.Router()

// router modules
const adminRoot = require('./modules/admin_root')
const user = require('./modules/user')

const { PERMISSION } = require('../models/auth_model')

// controllers
const AdminStudio = require('../controllers/admin_studio_controller')
const Studio = require('../controllers/studio_controller')

// middleware & utils
const auth = require('../middleware/auth')
const { wrapAsync } = require('../util/util')






// routers
router.use('/admin', adminRoot)
router.use('/user', user)



// studio owner & assistant
router.get('/:studioSubdomain/admin/live',
  auth.authenticated,
  wrapAsync(AdminStudio.renderLivePage)
)



// 建立價格頁面
router.get('/:studioSubdomain/admin/price/create',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_PRICE_RULES),
  wrapAsync(AdminStudio.renderCreatePricePage)
)

// 送出價格
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

router.get('/:studioSubdomain/admin/price',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_PRICE_RULES),
  wrapAsync(AdminStudio.renderAllPriceRule)
)




router.get('/:studioSubdomain/admin/course',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.renderCoursePage)
)

router.post('/:studioSubdomain/admin/course',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.createCourse)
)

router.get('/:studioSubdomain/admin/courseDetail',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.renderCourseDetailPage)
)

router.post('/:studioSubdomain/admin/courseDetail',
  auth.authenticated,
  auth.authorization(PERMISSION.CREATE_STUDIO_COURSE),
  wrapAsync(AdminStudio.createCourseDetail)
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





router.get('/', (req, res) => {
  res.render('home')
})

module.exports = router
