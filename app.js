require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { engine } = require('express-handlebars')
const handlebarsHelpers = require('./util/handlebars-helpers')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('./config/passport')
const flash = require('connect-flash')
const moment = require('moment-timezone')

const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})
const port = process.env.SERVER_PORT || 3000
const cookieExpireTime = 1000 * 60 * 60 * 24 // 單位毫秒
const router = require('./routes/index')

app.use(express.static('public'))
app.use('/images', express.static(path.join(__dirname, 'images'))) // 讓外部檔案也可以使用 images 裡面的檔案

app.engine('handlebars', engine({ helpers: handlebarsHelpers }))
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: cookieExpireTime }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.successMessage = req.flash('successMessage')
  res.locals.loginUser = req.user || null
  next()
})

app.use(router)

app.use((req, res) => {
  res.render('basic/404')
})

app.use((err, req, res, next) => {
  console.error(moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss'), err)
  return res.render('basic/500')
})

require('./controllers/socketIo.js')(io)

server.listen(port, () => {
  console.log(`server is listen on ${port}`)
})
