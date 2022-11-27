const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const app = express()
const methodOverride = require('method-override')
const mainRouter = require('./routes/main')
const profileRouter = require('./routes/profile')           
const authRouter = require('./routes/authRoute')
const articlesRouter = require('./routes/articles')
const isAuthenticated = require('./authentication/auth');
const cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
dotenv.config()
const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('Connected to MongoDB')).catch( err => console.log(err))



app.use('/', authRouter)
app.use('/articles', isAuthenticated, articlesRouter)
app.use('/profile', isAuthenticated, profileRouter)

app.use('/', mainRouter) 
















app.use((error, req, res, next) => {
    console.log('Error handling middleware called!')
    console.log(`req path ${req.path}`)

    if(error.type == 'Server error'){
        res.redirect('Server_error')
    }
    if(error.type == 'RedirectToLogin'){
        res.redirect('profile/login')
    }
    next()
})

app.listen(PORT, () => {
    console.log('Backend is running!')
})

module.exports = app