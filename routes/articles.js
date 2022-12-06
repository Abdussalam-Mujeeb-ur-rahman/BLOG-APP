const router = require('express').Router()
const Article = require('../Models/articleModel')
const userModel = require('../Models/UserModel')
const articlesController = require('../Controller/articlesController')
const validateArticleMiddleware = require('../validator/articleValidator')

router.get('/',  articlesController.newArticle)

router.get('/searchArticle', articlesController.searchArticle)

router.post('/createNewArticle', validateArticleMiddleware, articlesController.createNewArticle, (req, res) => {
    const article = req.body
    res.render('articles/createNewArticle', { author: req.user, message: 'Title already exists. Please use another title!', article: article })
})

router.post('/publishArticle/:id', articlesController.publishArticle)

router.get('/:slug', articlesController.getArticleBySlug)

router.get('/edit/:id', articlesController.editArticle)

router.get('/view/:id', articlesController.viewArticle)

router.put('/:id',articlesController.updateArticle)

router.delete('/:id', articlesController.deleteById)

router.post('/getArticleBySearch', articlesController.searchToGetArticle)

// router.get("/readArticle/:slug", articlesController.readArticle)


module.exports = router