const Article = require('../Models/articleModel')
const userModel = require('../Models/UserModel')



async function getProfile(req, res){
    try {
const articles = await Article.find({ author: req.user.first_name + " " + req.user.last_name })

        res.render('profile/profile',{ user: req.user, articles: articles })
    } catch (error) {
        res.status(500).redirect('Server_error.ejs')
    }
}

module.exports = { getProfile }