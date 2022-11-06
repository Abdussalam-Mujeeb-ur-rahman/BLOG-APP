const mongoose = require('mongoose')

articleSchema = new mongoose.Schema({
    title: {
        required: true,
        unique: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    details: {
        type: String,
        required: true
    }
},{ timestamps: true})

module.exports = mongoose.model('article', articleSchema)