const userModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req,res,next)=>{
    const {token} = req.cookies;
    try {
        if(!token){
           return res.redirect('/login')
        }
        const verify = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await userModel.findById(verify.id);
        next();
    } catch (error) {
       return next(error); 
    }
}

module.exports = isAuthenticated;