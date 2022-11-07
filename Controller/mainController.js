const Article = require('../Models/articleModel')

async function getHomePage(req, res){
    const articles = await Article.find().sort({ createdAt: 'desc' })
    try {
        res.render('articles/index', { articles: articles})
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}



module.exports = {
    getHomePage
}