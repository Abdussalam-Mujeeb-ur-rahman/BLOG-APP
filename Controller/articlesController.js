const { render } = require("ejs");
const Article = require("../Models/articleModel");
const userModel = require('../Models/UserModel')

async function newArticle(req, res) {
  res.setHeader('content-type', 'text/html')
  try {
    // console.log("req.user is", req.user)
    const article = req.body
    res.render("articles/createNewArticle", { author: req.user, message: 'Please create your article!', article: article });
  } catch (error) {
    res.status(500).render('Server_error');
  }
}

async function createNewArticle(req, res, next) {
  res.setHeader('content-type', 'text/html')
  const { title, description, details } = req.body;

  const existingTitle = await Article.findOne({ title });
  if (existingTitle) {
    return next();
  }

  try {
    // console.log(req.user)
    const article = await Article.create({ title, description, details, author: req.user.first_name + " " + req.user.last_name })

    res.render('articles/view_article', { article: article })
  } catch (error) {
    res.status(404);
    console.log(error);
    res.send("Server error!, Please refresh your page or try again later!");
  }
}

async function getArticleBySlug(req, res){
  try {
    const article = await Article.findOne({ slug: req.params.slug})  
    if( !article ) res.redirect('/')
    res.render('articles/view_article', { article: article })
  } catch (error) {
    res.json({ message: 'please check your id or refresh the page' })
  }

} 

async function deleteById(req, res){
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
}

async function editArticle(req, res){
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article })
}

async function updateArticle(req, res){
  try {
      const article = await Article.findByIdAndUpdate(req.params.id, { title: req.body.title, description: req.body.description, details: req.body.details, state: 'draft' }, { new: true })
      res.render('articles/view_article', { article: article })
  } catch (error) {
      res.json({ message: error })
  }


}

function searchArticle(req, res){
  try {
    res.render('articles/getArticle')
  } catch (error) {
    console.log(error)
  }
}

async function publishArticle(req, res){
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, { state: 'PUBLISHED' }, { new: true })
    res.render('articles/view_article', { article: article })
  } catch (error) {
    res.redirect('Server_error')
  }

}

async function searchToGetArticle(req, res){
  const { author } = req.body
  if(author){
    try {
      console.log('here!')
      const articles = await Article.find({ author: author, state: 'PUBLISHED' })
      // console.log(articles)
      return res.render('articles/getArticleBySearch', { articles: articles })
    } catch (error) {
      res.send('Server error!, please refresh your page or try again later!')
    }
  }
}

async function readArticle(req, res){
  try {
    const article = await Article.findOne({ slug: req.params.slug})  
    if( !article ) res.redirect('/')
    res.render('articles/readArticle', { article: article })
  } catch (error) {
    res.json({ message: 'please check your id or refresh the page' })
  }
}



async function viewArticle(req, res){
  try {
    const article = await Article.findById(req.user.id)
console.log('here!')
    // res.render('articles/view_article', { article: article })
  } catch (error) {
    res.redirect('Server_error')
  }
 
}

module.exports = {
  newArticle,
  createNewArticle,
  getArticleBySlug,
  deleteById,
  editArticle,
  updateArticle,
  searchArticle,
  publishArticle,
  searchToGetArticle,
  readArticle,
  viewArticle
};
