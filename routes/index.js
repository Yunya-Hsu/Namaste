const express = require('express')
const router = express.Router()

// router modules
const adminRoot = require('./modules/admin_root')
const user = require('./modules/user')

// controllers
const AdminStudio = require('../controllers/admin_studio_controller')
const Studio = require('../controllers/studio_controller')

// middleware
const { authenticated, authLivestream } = require('../middleware/auth')

// routers
router.use('/admin', adminRoot)
router.use('/user', user)






router.use('/:studioSubdomain/admin/live', authenticated, authLivestream, AdminStudio.renderLivePage)
router.use('/:studioSubdomain/admin', AdminStudio.renderHomePage)


router.use('/:studioSubdomain/live', Studio.renderLivePage)
router.use('/:studioSubdomain', Studio.renderHomePage)






router.use('/', (req, res) => {
  res.render('home')
})

module.exports = router
