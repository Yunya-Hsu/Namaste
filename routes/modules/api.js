const router = require('express').Router()

// controllers
const Api = require('../../controllers/api_controller')

// middleware & utils
const { wrapAsync } = require('../../util/util')



router.get('/search', wrapAsync(Api.search))

module.exports = router
