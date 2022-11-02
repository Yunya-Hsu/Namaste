const router = require('express').Router()

// controllers
const User = require('../../controllers/user_controller')

// 套件
const passport = require('../../config/passport')

// routers
router.get('/register', User.renderRegisterPage)
router.post('/register', User.registerUser)

router.get('/login', User.renderLoginPage)
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/user/register' }),
  User.signIn
)



module.exports = router
