const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const domPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const createDomPurifier = domPurify(new JSDOM().window)

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
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    // cleansedHTML: {
    //     type: String,
    //     required: true
    // }
},{ timestamps: true})

articleSchema.pre('validate', function(next){
    if (this.title){
        this.slug = slugify(this.title, { lower: true, strict: true})
    }

    // if(this.details){
    //     this.cleansedHTML = createDomPurifier.sanitize(marked.(this.details)) 
    // }

    next()
})

module.exports = mongoose.model('article', articleSchema)