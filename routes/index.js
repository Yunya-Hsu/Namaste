const express = require('express')
const router = express.Router()

// router modules
const adminRoot = require('./modules/admin_root')
const user = require('./modules/user')

// controllers
const AdminStudio = require('../controllers/admin_studio_controller')
const Studio = require('../controllers/studio_controller')

// middleware & utils
const { authenticated } = require('../middleware/auth')
const { wrapAsync } = require('../util/util')

// routers
router.use('/admin', adminRoot)
router.use('/user', user)






router.use('/:studioSubdomain/admin/live', authenticated, wrapAsync(AdminStudio.renderLivePage))
router.use('/:studioSubdomain/admin', wrapAsync(AdminStudio.renderHomePage))


router.use('/:studioSubdomain/live', authenticated, wrapAsync(Studio.renderLivePage))
router.use('/:studioSubdomain', wrapAsync(Studio.renderHomePage))


router.get('/', (req, res) => {
  res.render('home')
})

module.exports = router
