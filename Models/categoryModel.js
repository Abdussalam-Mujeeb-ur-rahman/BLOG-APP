const mongoose = require('mongoose')

categorySchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    }
})