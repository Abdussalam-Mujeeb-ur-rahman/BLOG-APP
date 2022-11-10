const mongoose = require('mongoose')

userSchema = new mongoose.Schema({
    first_name: {
        required: true,
        type: String,
        minLength: [4,'Name should be minimum of 4 characters']
    },
    last_name: {
        required: true,
        type: String,
        minLength: [4,'Name should be minimum of 4 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: [8,'Password should be minimum of 8 characters']
        // required: true
    },
    token:{
        type:String,
        required: true,
        default: 'token'
    }
},{ timestamps: true })


module.exports = mongoose.model('users', userSchema)