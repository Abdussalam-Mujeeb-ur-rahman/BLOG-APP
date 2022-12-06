const router = require('express').Router()
const Article = require('../Models/articleModel')
const mainController = require('../Controller/mainController')
const jwt = require('jsonwebtoken');
require('dotenv').config()


router.get('/', mainController.getHomePage)

router.get('/login', mainController.getLoginPage)

router.get('/signup', mainController.getSignupPage)

router.get("/readArticle/:slug", mainController.readArticle)

module.exports = router