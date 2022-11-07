const router = require('express').Router()
const Article = require('../Models/articleModel')
const articlesController = require('../Controller/articlesController')


router.get('/createNewArticle', articlesController.newArticle)

router.post('/createNewArticle', articlesController.createNewArticle)

router.get('/:slug', articlesController.getArticleBySlug)

router.get('/edit/:id', articlesController.editArticle)

router.get('/getArticle', articlesController.getArticle)


router.put('/:id',articlesController.updateArticle)

router.delete('/:id', articlesController.deleteById)

module.exports = router