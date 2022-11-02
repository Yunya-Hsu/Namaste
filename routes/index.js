const express = require('express')
const router = express.Router()

// modules
const admin = require('./modules/admin')
const user = require('./modules/user')

// routers
router.use('/admin', admin)
router.use('/user', user)

router.get('/', (req, res) => {
  console.log('=========')
  console.log(req.user)
  console.log('=========')


  res.send('<h1>首頁！</h1>')
})

module.exports = router
