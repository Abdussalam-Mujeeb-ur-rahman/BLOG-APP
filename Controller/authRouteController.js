const userModel = require("../Models/UserModel");
const Article = require("../Models/articleModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
async function signup(req, res, next) {
  const { first_name, last_name, email, password } = req.body;
  try {
    //user exist
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next();
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user
    const result = await userModel.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    //token
    const token = jwt.sign(
      { name: result.email, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    await userModel.findByIdAndUpdate(
      result.id,
      { token: token },
      { new: true }
    );
    //articles
    const articles = await Article.find({ state: "PUBLISHED" }).sort({
      createdAt: "desc",
    });

    res.cookie("token", token);
    res.render("articles/index", {
      articles: articles,
      user: result.first_name + " " + result.last_name,
      message:
        "We are delighted to have you here!. Proceed to building your prestigious career!",
    });
    
  } catch (err) {
    console.log(err);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return next();
    }
    const validate = await bcrypt.compare(password, user.password);
    try {
      if (!validate) {
        return next();
      }
    } catch (error) {
      console.log(`error ${error}!`);
    }

    //token
    const token = jwt.sign(
      { name: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    await userModel.findByIdAndUpdate(user.id, { token: token }, { new: true });

    // //articles
    const articles = await Article.find({ state: "PUBLISHED" }).sort({
      createdAt: "desc",
    });
    // console.log(articles)
    res.cookie("token", token);
    res.render("articles/index", {
        articles: articles,
        user: user.first_name + " " + user.last_name,
        message:
          "We are delighted to have you here!. Proceed to building your prestigious career!",
      });
  } catch (error) {
    console.log(`server error`);
  }
}

module.exports = {
  signup,
  login,
};
