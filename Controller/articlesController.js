const Article = require("../Models/articleModel");

function newArticle(req, res) {
  try {
    res.status(200);
    res.render("articles/createNewArticle");
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function createNewArticle(req, res) {
  const { title, description, details } = req.body;

  const existingTitle = await Article.findOne({ title });
  if (existingTitle) {
    return res.send(`title already exist!`);
  }

  try {
    const article = await Article.create({ title, description, details });
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
    res.status(404);
    console.log(error);
    res.render("articles/createNewArticle");
  }
}

async function getArticleById(req, res){
  try {
    const article = await Article.findById(req.params.id)  
    if( !article ) res.redirect('/')
    res.render('articles/view_article', { article: article })
  } catch (error) {
    res.json({ message: 'please check your id or refresh the page' })
  }

} 

module.exports = {
  newArticle,
  createNewArticle,
  getArticleById,
};
