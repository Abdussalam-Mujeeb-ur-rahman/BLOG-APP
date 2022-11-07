const router = require('express').Router()
const Article = require('../Models/articleModel')
const profileController = require('../Controller/profileController')



router.get('/', profileController.getProfile)

module.exports = router