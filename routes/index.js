const express = require('express')
const router = express.Router()

// modules
const admin = require('./modules/admin')

// routers
router.use('/admin', admin)
router.get('/', (req, res) => {
  res.render('home')
})

module.exports = router
