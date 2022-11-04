const moment = require('moment')
const validator = require('validator')
const argon2 = require('argon2')

const User = require('../models/user_model')

const studio = require('../models/namaste_parameters')



const renderRegisterPage = (req, res) => {
  const input = req.flash('registerInput')[0]
  res.render('user/register', { studio, input })
}

const registerUser = async (req, res) => {
  const { name, email, password, confirmedPassword } = req.body

  // 檢查前端資料，若不足則擋下
  if (!name || !email) {
    req.flash('registerInput', req.body)
    req.flash('errorMessage', 'Missing name or email')
    return res.redirect('/user/register')
  }

  // 檢查 email 格式
  if (!validator.isEmail(email)) {
    console.log(email) // TODO: check console.log level
    delete req.body.email
    req.flash('registerInput', req.body)
    req.flash('errorMessage', 'Wrong email format')
    return res.redirect('/user/register')
  }

  // 若 password & confirmedPassword 不相符，擋下
  if (password !== confirmedPassword) {
    delete req.body.password
    delete req.body.confirmedPassword
    req.flash('registerInput', req.body)
    req.flash('errorMessage', 'Password and confirmed password does not match')
    return res.redirect('/user/register')
  }

  // 檢查密碼強度
  if (!validator.isStrongPassword(password)) {
    delete req.body.password
    delete req.body.confirmedPassword
    req.flash('registerInput', req.body)
    req.flash('errorMessage', 'Please use strong password')
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
  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
  const userId = await User.createUser(name, email, hashPassword, currentTime, currentTime)
  return res.send(
    `<h1>create user, id: ${userId}</h1>`
  )
}

const renderLoginPage = (req, res) => {
  res.render('user/login', { studio })
}

const signIn = async (req, res) => {
  if (req.user.role_id === 0) {
    return res.redirect('/admin/studio')
  }
  return res.json({ data: 'success' })
}

const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return console.log(err)
    }
    req.flash('successMessages', 'session terminated')
    res.redirect('/user/login')
  })
}

module.exports = {
  renderRegisterPage,
  registerUser,
  renderLoginPage,
  signIn,
  logout
}
