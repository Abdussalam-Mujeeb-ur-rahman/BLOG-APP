const userModel = require('../Models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

async function signup(req, res, next) {
    const {first_name, last_name, email, password} = req.body;
    try{
    //user exist
    const existingUser = await userModel.findOne({email})
    if(existingUser){
        return next()
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user
    const result = await userModel.create({first_name, last_name, email, password: hashedPassword,})
    //token
    const token = jwt.sign({name: result.email, id: result._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
    return res.status(200).cookie({ 'token': token }).send('pure')
    }catch(err){
    console.log(err)
    return res.status(500).json({message: "something wrong"});
    }
}

async function login(req, res, next){
    res.setHeader('content-type', 'application/json');
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({email})
        if(!user){ return next() }

        const validate = await bcrypt.compare( password, user.password)
        try {
            if(!validate){ return next() }            
        } catch (error) {
            console.log(`error ${error}!`)
        }
        console.log('success logging in!')

        //token
       const token = jwt.sign({name: user.email, id: user._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
       return res.cookie({ token }).status(200).send('pure')
    } catch (error) {
        res.status(500).json({message: error})
        console.log(`server error`)
    }
}

module.exports = {
  signup,
  login
};
