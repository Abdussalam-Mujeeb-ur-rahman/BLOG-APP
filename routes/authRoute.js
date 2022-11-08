const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../Models/UserModel')
const router = require('express').Router()
const authRouteController = require('../Controller/authRouteController')

router.post('/signup', authRouteController.signup, (req, res) => {
    res.render('signup', { message: 'Username already exists!', userInfo: req.body })
})
router.post('/login', authRouteController.login, (req, res) => {
    res.setHeader('content-type', 'text/html')
    res.render('login', { message: 'password or username not correct!', userInfo: req.body})
})

module.exports = router