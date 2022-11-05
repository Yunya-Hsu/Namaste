const router = require('express').Router()

// controllers
const User = require('../../controllers/user_controller')

// middleware & utils
const passport = require('../../config/passport')
const { authenticated } = require('../../middleware/auth')
const { wrapAsync } = require('../../util/util')


// routers
router.get('/register', wrapAsync(User.renderRegisterPage))
router.post('/register', wrapAsync(User.registerUser))

router.get('/login', wrapAsync(User.renderLoginPage))
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/user/login' }),
  wrapAsync(User.login)
)
router.get('/logout', authenticated, wrapAsync(User.logout))



module.exports = router
