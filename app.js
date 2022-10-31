require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const exphbs = require('express-handlebars')
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})
const port = process.env.SERVER_PORT || 3000

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.engine('hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', 'hbs')


require('./controllers/socketIo.js')(io)


server.listen(port, () => {
  console.log(`server is listen on ${port}`)
})
