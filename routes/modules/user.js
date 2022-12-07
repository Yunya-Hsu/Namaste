const router = require('express').Router()

// controllers
const User = require('../../controllers/user_controller')

// utils
const { wrapAsync } = require('../../util/util')

// middleware
const passport = require('../../config/passport')
const { authenticated } = require('../../middleware/auth')
const { verifyRegisterData } = require('../../middleware/verifyInput')


// routers
router.get('/register', wrapAsync(User.renderRegisterPage))
router.post('/register',
  wrapAsync(verifyRegisterData),
  wrapAsync(User.registerUser)
)
router.get('/login', wrapAsync(User.renderLoginPage))
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/user/login' }),
  wrapAsync(User.login)
)
router.get('/logout',
  authenticated,
  wrapAsync(User.logout)
)
router.get('/profile',
  authenticated,
  wrapAsync(User.renderProfilePage)
)



module.exports = router
