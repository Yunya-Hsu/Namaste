const express = require('express')
const router = express.Router()

// router modules
const adminRoot = require('./modules/admin_root')
const user = require('./modules/user')

// controllers
const AdminStudio = require('../controllers/admin_studio_controller')
const Studio = require('../controllers/studio_controller')

// middleware & utils
const auth = require('../middleware/auth')
const { wrapAsync } = require('../util/util')

// routers
router.use('/admin', adminRoot)
router.use('/user', user)




router.get('/:studioSubdomain/admin/live',
  auth.authenticated,
  wrapAsync(AdminStudio.renderLivePage)
)


router.get('/:studioSubdomain/admin/price',
  auth.authenticated,
  auth.authDedicatedStudio,
  wrapAsync(AdminStudio.renderPricePage)
)

router.post('/:studioSubdomain/admin/price',
  auth.authenticated,
  auth.authDedicatedStudio,
  wrapAsync(AdminStudio.createPriceRule)
)

router.get('/:studioSubdomain/admin/course',
  auth.authenticated,
  auth.authDedicatedStudio,
  wrapAsync(AdminStudio.renderCoursePage)
)

router.post('/:studioSubdomain/admin/course',
  auth.authenticated,
  auth.authDedicatedStudio,
  wrapAsync(AdminStudio.createCourse)
)

router.get('/:studioSubdomain/admin/courseDetail',
  auth.authenticated,
  auth.authDedicatedStudio,
  wrapAsync(AdminStudio.renderCourseDetailPage)
)

router.post('/:studioSubdomain/admin/courseDetail',
  auth.authenticated,
  auth.authDedicatedStudio,
  wrapAsync(AdminStudio.createCourseDetail)
)

router.get('/:studioSubdomain/admin',
  auth.authenticated,
  auth.authDedicatedStudio,
  wrapAsync(AdminStudio.renderHomePage)
)




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
router.get('/:studioSubdomain', wrapAsync(Studio.renderHomePage))





router.get('/', (req, res) => {
  res.render('home')
})

module.exports = router
