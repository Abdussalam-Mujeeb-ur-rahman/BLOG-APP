const router = require('express').Router()
const Article = require('../Models/articleModel')
const userModel = require('../Models/UserModel')
const profileController = require('../Controller/profileController')



router.get('/', profileController.getProfile)



module.exports = router