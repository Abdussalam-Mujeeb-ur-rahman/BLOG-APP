const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const app = express()
const passport = require('passport')
const mainRouter = require('./routes/main')
const authRouter = require('./routes/authRoute')
const articlesRouter = require('./routes/articles')
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(logger('dev'))
app.use(bodyParser.json())
dotenv.config()
const PORT = process.env.PORT
// require('./authentication/auth')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('Connected to MongoDB')).catch( err => console.log(err))



app.use('/', authRouter)
app.use('/articles', articlesRouter)

app.get('/', mainRouter)












app.use((error, req, res, next) => {
    console.log('Error handling middleware called!')
    console.log(`req path ${req.path}`)

    if(error.type == 'Server error'){
        res.redirect('Server_error')
    }
    next()
})

app.listen(PORT, () => {
    console.log('Backend is running!')
})