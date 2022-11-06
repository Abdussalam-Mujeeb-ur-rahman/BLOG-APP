const router = require('express').Router()
const mainController = require('../Controller/mainController')

router.get('/', mainController.getHomePage)

module.exports = router