const moment = require('moment-timezone')
const validator = require('validator')
const argon2 = require('argon2')
const passwordRule = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 0,
  minSymbols: 0
}

const User = require('../models/user_model')

const studio = require('../models/namaste_parameters')



const renderRegisterPage = async (req, res) => {
  const input = req.flash('registerInput')[0]
  res.render('user/register', { studio, input })
}

const registerUser = async (req, res) => {
  const { name, email, password, confirmedPassword } = req.body

  // 檢查前端資料，若不足則擋下
  if (!name || !email) {
    req.flash('registerInput', req.body)
    req.flash('errorMessage', '缺少 email 或 name')
    return res.redirect('/user/register')
  }

  // 檢查 email 格式
  if (!validator.isEmail(email)) {
    delete req.body.email
    req.flash('registerInput', req.body)
    req.flash('errorMessage', '請檢查 email 格式')
    return res.redirect('/user/register')
  }

  // 若 password & confirmedPassword 不相符，擋下
  if (password !== confirmedPassword) {
    delete req.body.password
    delete req.body.confirmedPassword
    req.flash('registerInput', req.body)
    req.flash('errorMessage', '「密碼」及「確認密碼」不相符，請檢查')
    return res.redirect('/user/register')
  }

  // 檢查密碼強度
  if (!validator.isStrongPassword(password, passwordRule)) {
    delete req.body.password
    delete req.body.confirmedPassword
    req.flash('registerInput', req.body)
    req.flash('errorMessage', '請使用高強度密碼')
    return res.redirect('/user/register')
  }

  // 檢查 email 是否重複
  const isExistEmail = await User.findUserByEmail(email)
  if (isExistEmail) {
    req.flash('registerInput', req.body)
    req.flash('errorMessage', 'email already exist')
    return res.redirect('/user/register')
  }


  // 加密 password
  const hashPassword = await argon2.hash(password)
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  await User.createUser(name, email, hashPassword, currentTime, currentTime)
  req.flash('successMessage', '註冊成功！')
  res.redirect('/user/login')
}

const renderLoginPage = async (req, res) => {
  res.render('user/login', { studio })
}

const login = async (req, res, next) => {
  req.flash('successMessage', 'Login successfully')
  res.redirect('/')
}

const logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return console.log(err)
    }
    req.flash('successMessage', 'Logout')
    res.redirect('/user/login')
  })
}

const renderProfilePage = async (req, res) => {
  // 取得 order 資料
  const orderList = await User.getOrders(req.user.id)

  // 取得 registration 資料
  const registrationList = await User.getRegistration(req.user.id)

  res.render('user/profile', {
    orderList,
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
