const { render } = require("ejs");
const Article = require("../Models/articleModel");
const userModel = require('../Models/UserModel')

async function newArticle(req, res) {
  // res.setHeader('content-type', 'text/html')
  try {
    // console.log("req.user is", req.user)
    const article = req.body
    res.render("articles/createNewArticle", { author: req.user, message: 'Please create your article!', article: article });
  } catch (error) {
    res.status(500).render('Server_error');
  }
}

async function createNewArticle(req, res, next) {
  // res.setHeader('content-type', 'text/html')
  // console.log(req.body)
  const { title, tags, description, details } = req.body;

  const existingTitle = await Article.findOne({ title });
  if (existingTitle) {
    return next();
  }

  try {
    // console.log(req.user)
    const article = await Article.create({ title, tags, description, details, author: req.user.first_name + " " + req.user.last_name })

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
    await Article.findByIdAndUpdate(article.id, { read_count: read_count + 1 }, { new: true })  
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
  const { page = 1, limit = 20 } = req.query;
  const { author, title, tag } = req.body
    try {
      if(!author && !title && !tag){
        const articles = await Article.find({ state: 'PUBLISHED' })
        .sort({
          createdAt: "desc",
        })
        .limit(limit * 1)
        .skip((page - 1) * limit);
        return res.render('articles/getArticleBySearch', { articles: articles })
      }
      if(!author && !title && tag){
        const articles = await Article.find({ tag: tag, state: 'PUBLISHED' })
        .sort({
          createdAt: "desc",
        })
        .limit(limit * 1)
        .skip((page - 1) * limit);
        return res.render('articles/getArticleBySearch', { articles: articles })
      }
      if(!author && title && !tag){
        const articles = await Article.find({ title: title, state: 'PUBLISHED' })
        .sort({
          createdAt: "desc",
        })
        .limit(limit * 1)
        .skip((page - 1) * limit);
        return res.render('articles/getArticleBySearch', { articles: articles })
      }
      if(author && !title && !tag){
        const articles = await Article.find({ author: author, state: 'PUBLISHED' })
        .sort({
          createdAt: "desc",
        })
        .limit(limit * 1)
        .skip((page - 1) * limit);
        return res.render('articles/getArticleBySearch', { articles: articles })
      }
      if(!author && title && tag){
        const articles = await Article.find({ title: title, tag: tag, state: 'PUBLISHED' })
        .sort({
          createdAt: "desc",
        })
        .limit(limit * 1)
        .skip((page - 1) * limit);
        return res.render('articles/getArticleBySearch', { articles: articles })
      }
      if(author && !title && tag){
        const articles = await Article.find({ author: author, tag: tag, state: 'PUBLISHED' })
        .sort({
          createdAt: "desc",
        })
        .limit(limit * 1)
        .skip((page - 1) * limit);
        return res.render('articles/getArticleBySearch', { articles: articles })
      }
      if(author && title && !tag){
        const articles = await Article.find({ author: author, title: title, state: 'PUBLISHED' })
        .sort({
          createdAt: "desc",
        })
        .limit(limit * 1)
        .skip((page - 1) * limit);
        return res.render('articles/getArticleBySearch', { articles: articles })
      }
      const articles = await Article.find({ author: author, title: title, tag: tag, state: 'PUBLISHED' })
      .sort({
        createdAt: "desc",
      })
      .limit(limit * 1)
      .skip((page - 1) * limit);
      return res.render('articles/getArticleBySearch', { articles: articles })
    } catch (error) {
      res.send('Server error!, please refresh your page or try again later!')
    }
}

async function readArticle(req, res){
  try {
    const article = await Article.findOne({ slug: req.params.slug})  
    try {
      
      await Article.findByIdAndUpdate(article.id, { read_count: article.read_count + 1 }, { new: true }) 
    } catch (error) {
      console.log(`error from read_count update ${error}`)
    }
    if( !article ) res.redirect('/')
    res.render('articles/readArticle', { article: article })
  } catch (error) {
    res.json({ message: 'please check your id or refresh the page' })
  }
}



async function viewArticle(req, res){
  try {
    const article = await Article.findById(req.params.id)
// console.log('here!')
// console.log(article)
    res.render('articles/view_article', { article: article })
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
