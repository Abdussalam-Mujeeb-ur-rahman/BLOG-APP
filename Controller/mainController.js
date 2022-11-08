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

function getLoginPage(req, res){
    try {
        res.status(200).render('login')
    } catch (error) {
        res.status.json({ error })
    }
}

function getSignupPage(req, res){
    try {
        const {first_name, last_name, email, password} = req.body
        res.status(200).render('signup', { message: '', userInfo: req.body })
    } catch (error) {
        res.status.json({ error })
    }
}


module.exports = {
    getHomePage,
    getLoginPage,
    getSignupPage
}