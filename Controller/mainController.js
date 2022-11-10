const Article = require("../Models/articleModel");
const userModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function getHomePage(req, res) {
  const token = await req.cookies["token"];
  const articles = await Article.find({ state: "PUBLISHED" }).sort({
    createdAt: "desc",
  });

  try {
    if (!token) {
      try {
        res.render("articles/index", {
          articles: articles,
          user: "Guest",
          message:
            "Please sign up or log in to our blog site to get access to all articles and give rise to interesting ones!",
        });
      } catch (error) {
        res
          .status(500)
          .send("Server error!, please refresh your page or try again later!");
      }
    }
  } catch (error) {
    res
      .status(500)
      .send("Server error!, please refresh your page or try again later!");
  }
  try {
    var verify = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error)
    return  res.render("articles/index", {
        articles: articles,
        user: "Guest",
        message:
          "Please sign up or log in to our blog site to get access to all articles and give rise to interesting ones!",
      });
  }
  const id = verify.id;

  try {
    req.user = await userModel.findById(id);
  } catch (error) {
    console.log(`error from userModel ${error}`);
  }

  const user = await userModel.findById(req.user.id);

  try {
    res.render("articles/index", {
      articles: articles,
      user: req.user.first_name + " " + req.user.last_name,
      message:
        "We are delighted to have you here!. Proceed to building your prestigious career!",
    });
  } catch (error) {
    res
      .status(500)
      .send("Server error!, please refresh your page or try again later!");
  }
}

function getLoginPage(req, res) {
  try {
    const { email, password } = req.body;
    res.status(200).render("login", { message: "", userInfo: req.body });
  } catch (error) {
    res.status.json({ error });
  }
}

function getSignupPage(req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;
    res.status(200).render("signup", { message: "", userInfo: req.body });
  } catch (error) {
    res.status.json({ error });
  }
}

module.exports = {
  getHomePage,
  getLoginPage,
  getSignupPage,
};
