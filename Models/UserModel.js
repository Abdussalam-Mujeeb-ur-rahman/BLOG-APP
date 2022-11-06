const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passportLocalMongoose = require('passport-local-mongoose')

userSchema = new mongoose.Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
    },
},{ timestamps: true })


userSchema.methods.passwordIsValid = async (password) => {
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    return compare
}

module.exports = mongoose.model('users', userSchema)