require('dotenv').config()
const express = require('express')
const app = express()

const { engine } = require('express-handlebars')
const handlebarsHelpers = require('./util/handlebars-helpers')

const rateLimiter = require('./middleware/rateLimiter')
const methodOverride = require('method-override')

const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const { sessionClient } = require('./config/redis')
const cookieExpireTime = 1000 * 60 * 60 * 24 // 單位毫秒
const passport = require('./config/passport')

const flash = require('connect-flash')
const connectFlash = require('./middleware/connectFlash')
const router = require('./routes/index')

const moment = require('moment-timezone')

const port = process.env.SERVER_PORT || 3000
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*' // FIXME: origin 改掉
  }
})



app.use(express.static('public'))
app.engine('handlebars', engine({ helpers: handlebarsHelpers }))
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(rateLimiter)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

app.use(session({
  store: new RedisStore({ client: sessionClient }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: cookieExpireTime }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use(connectFlash)
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
