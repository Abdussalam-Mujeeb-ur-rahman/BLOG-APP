const jwt = require('jsonwebtoken');
require('dotenv').config()
const userModel = require('../Models/UserModel');

const isAuthenticated = async (req,res,next)=>{
    const token = req.cookies['token']
    try {
        if(!token){
           return res.redirect('login')
        }
        try {
            var verify = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("verifyId", verify.id)
           
        } catch (error) {
            console.log(`error from verify ${error}`)
            return res.redirect('login')
        }

        const id = verify.id
        // console.log("type of id is", typeof(id))

        try {
            req.user = await userModel.findById(id);
            // console.log(req.user)
        } catch (error) {
            console.log(`error from userModel ${error}`)
            res.send('Database timeout!, please refresh your page or try again later!')
        }
        
        next();
    } catch (error) {
       return next(error); 
    }
}

module.exports = isAuthenticated;