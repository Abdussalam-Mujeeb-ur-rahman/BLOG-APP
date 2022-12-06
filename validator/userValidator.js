
const joi = require('joi')

const userValidator = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required().min(6).max(20),
    confirm_password: joi.ref('password')

})

async function validateUserMiddleware(req, res, next)
{
    const userPayload = req.body
    try {
        await userValidator.validateAsync(userPayload)
        next()
    } catch (error) {
        console.log(error)
        return res.status(406).render("signup", { message: error.details[0].message, userInfo: req.body })
    }
}

module.exports = validateUserMiddleware