const router = require('express').Router()

// controllers
const Studio = require('../../controllers/studio_controller')

// middleware & utils
const { authenticated } = require('../../middleware/auth')
const { wrapAsync } = require('../../util/util')


router.get('/price', wrapAsync(Studio.renderPricePage))
router.get('/checkout', authenticated, wrapAsync(Studio.renderCheckoutPage))
router.post('/checkout', authenticated, wrapAsync(Studio.checkout))
router.get('/course', wrapAsync(Studio.renderCoursePage))
router.get('/registration', authenticated, wrapAsync(Studio.registerCourse))
router.get('/about', wrapAsync(Studio.renderAboutPage))
router.get('/:livestreamType', authenticated, wrapAsync(Studio.renderLivePage))

router.get('/', wrapAsync(Studio.renderHomePage))


module.exports = router
