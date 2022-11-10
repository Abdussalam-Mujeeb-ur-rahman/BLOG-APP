const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const domPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const createDomPurifier = domPurify(new JSDOM().window)
const showdown = require('showdown')
const converter = new showdown.Converter()
const { convert } = require('html-to-text');
const htmlToFormattedText = require("html-to-formatted-text");

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
    author: {
        type: String,
        required: true,
        default: 'author'
    },
    state: {
        type: String,
        required: true,
        default: 'draft'
    },
    read_count: {
        type: Number,
        required: true,
        default: 0
    },
    cleansedHTML: {
        type: String
    }
},{ timestamps: true})

articleSchema.pre('validate', function(next){
    if (this.title){
        this.slug = slugify(this.title, { lower: true, strict: true})
    }

    if(this.details){
        this.cleansedHTML = convert( converter.makeHtml(this.details) )
        
    }

    next()
})

module.exports = mongoose.model('article', articleSchema)