const argon2 = require('argon2')

// model, service, utility
const User = require('../models/user_model')
const TimeService = require('../util/time')


const renderRegisterPage = async (req, res) => {
  const input = req.flash('registerInput')[0]
  res.render('user/register', { input })
}

const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  const hashPassword = await argon2.hash(password)
  await User.createUser(name, email, hashPassword, TimeService.currentTime(), TimeService.currentTime())
  req.flash('successMessage', '註冊成功！')
  res.redirect('/user/login')
}

const renderLoginPage = async (req, res) => {
  res.render('user/login')
}

const login = async (req, res, next) => {
  req.flash('successMessage', '登入成功')
  res.redirect('/')
}

const logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return console.log(err)
    }
    req.flash('successMessage', '已登出')
    res.redirect('/user/login')
  })
}

const renderProfilePage = async (req, res) => {
  const orderList = await User.getOrders(req.user.id, TimeService.currentTime())
  const expireOrderList = await User.getExpiredOrders(req.user.id, TimeService.currentTime())
  const registrationList = await User.getRegistration(req.user.id)

  res.render('user/profile', {
    orderList,
    expireOrderList,
    registrationList
  })
}

module.exports = {
  renderRegisterPage,
  registerUser,
  renderLoginPage,
  login,
  logout,
  renderProfilePage
}
