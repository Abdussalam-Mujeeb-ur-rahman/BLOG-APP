const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../Models/UserModel')
const router = require('express').Router()
const authRouteController = require('../Controller/authRouteController')

router.post('/signup', authRouteController.signup)
router.post('/login', authRouteController.login)



module.exports = router