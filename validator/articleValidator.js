const joi = require('joi')

const articleValidator = joi.object({
    title: joi.string()
    .min(6)
    .max(50)
    .required(),
    tags: joi.any().required(),
    description: joi.string().min(20).max(80).required(),
    details: joi.string().min(80).max(1000000)
})

async function validateArticleMiddleware(req, res, next)
{
    const articlePayload = req.body
    try {
        await articleValidator.validateAsync(articlePayload)
        next()
    } catch (error) {
        console.log(error)
        res.status(404).render('articles/createNewArticle', { message: error.details[0].message, article: articlePayload })
    }
}


module.exports = validateArticleMiddleware