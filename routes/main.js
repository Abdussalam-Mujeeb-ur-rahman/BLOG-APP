const router = require('express').Router()
const Article = require('../Models/articleModel')
const mainController = require('../Controller/mainController')

router.get('/', mainController.getHomePage)


module.exports = router