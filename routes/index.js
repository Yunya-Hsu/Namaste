const express = require('express')
const router = express.Router()

// router modules
const adminRoot = require('./modules/admin_root')
const user = require('./modules/user')
const api = require('./modules/api')
const adminStudio = require('./modules/admin_studio')
const studio = require('./modules/studio')

// controllers
const AdminRoot = require('../controllers/admin_root_controller')

// middleware & utils
const { authenticated } = require('../middleware/auth')
const { wrapAsync } = require('../util/util')
const verifyStudio = require('../middleware/verifyStudio')



// routers
router.use('/admin', adminRoot)
router.use('/user', user)
router.use('/api', api)

// get studio 的 middleware
router.use('/:studioSubdomain', wrapAsync(verifyStudio))

// routers
router.use('/:studioSubdomain/admin', authenticated, adminStudio)
router.use('/:studioSubdomain', studio)
router.get('/', wrapAsync(AdminRoot.renderNamasteHomePage))

router.use((req, res) => {
  return res.render('basic/404')
})

module.exports = router
