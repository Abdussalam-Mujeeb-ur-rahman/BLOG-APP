const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const userModel = require('../Models/UserModel')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const dotenv = require('dotenv');

dotenv.config()

passport.use(new JWTstrategy(
    {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async(token, done) => {
        try {
            return done(null, token.user)
        } catch (error) {
            done(error)
        }
    }
))

passport.use('signup', new localStrategy({
    firstNameField: 'first_name',
    lastNameField: 'last_name',
    usernameField: 'email',
    passwordField: 'password'
}, async (first_name, last_name, email, password, done) => {
    try {
        const user = await userModel.create({ first_name, last_name, email, password });
        return done(null, user)
    } catch (error) {
       console.log(error)
    }
}))