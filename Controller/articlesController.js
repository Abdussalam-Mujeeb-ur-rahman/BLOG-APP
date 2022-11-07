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
    res.redirect(`/articles/${article.slug}`);
  } catch (error) {
    res.status(404);
    console.log(error);
    res.render("articles/createNewArticle");
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
      const article = await Article.findByIdAndUpdate(req.params.id, { title: req.body.title, description: req.body.description, details: req.body.details }, { new: true })
      res.render('articles/view_article', { article: article })
  } catch (error) {
      res.json({ message: error })
  }


}

function getArticle(req, res){
  try {
    
    res.send('construction ongoing here!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  newArticle,
  createNewArticle,
  getArticleBySlug,
  deleteById,
  editArticle,
  updateArticle,
  getArticle
};
