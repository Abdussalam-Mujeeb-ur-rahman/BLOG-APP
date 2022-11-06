const router = require('express').Router()
const Article = require('../Models/articleModel')
const articlesController = require('../Controller/articlesController')


router.get('/createNewArticle', articlesController.newArticle)

router.post('/createNewArticle', articlesController.createNewArticle)

router.get('/:id', articlesController.getArticleById)

module.exports = router