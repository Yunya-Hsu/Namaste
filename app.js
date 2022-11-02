require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { engine } = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')

const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})
const port = process.env.SERVER_PORT || 3000
const router = require('./routes/index')

app.use(express.static('public'))
app.use('/images', express.static(path.join(__dirname, 'images'))) // 讓外部檔案也可以使用 images 裡面的檔案

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false
}))
app.use(flash())

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(router)
require('./controllers/socketIo.js')(io)

server.listen(port, () => {
  console.log(`server is listen on ${port}`)
})
