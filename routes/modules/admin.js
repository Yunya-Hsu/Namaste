const router = require('express').Router()

// controllers
const Admin = require('../../controllers/admin_controller')

// routers
router.get('/studio', Admin.renderCreateStudioPage)
router.post('/studio', Admin.createStudio)

module.exports = router

