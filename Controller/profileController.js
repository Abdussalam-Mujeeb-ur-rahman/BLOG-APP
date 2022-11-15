const Article = require("../Models/articleModel");
const userModel = require("../Models/UserModel");

async function getProfile(req, res) {
  try {
    const { page = 1, limit = 20 } = req.query;
    const articles = await Article.find({
      author: req.user.first_name + " " + req.user.last_name,
    })
    .sort({
        createdAt: "desc"
    })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    res.render("profile/profile", { user: req.user, articles: articles });
  } catch (error) {
    res.status(500).redirect("Server_error.ejs");
  }
}

module.exports = { getProfile };
