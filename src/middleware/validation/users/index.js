const Joi = require('joi');



module.exports = {
    validateUserSignIn: (req, res, next) => {
        Joi.validate({ body:req.body}, {
            body: {
                email: Joi.toString().required().email(),
                password: Joi.toString().required().min(8)
            }
    }, (err) => {
            if (err) {
                req.status(400).json({name: err.name, message: err.details[0].message})
            }
            next()
        })
    },

    validateGetUser: (req, res, next) => {
        Joi.validate({params: req.params}, {
            params: {
                userId: Joi.string().length(24).required()
            }
        }, (err) => {
            if (err) {
                res.status(400).json({name: err.name, message: err.details[0].message})
            }
            next()
        })
    },

    validateRegisterUser: (req, res, next) => {
        Joi.validate({body: req.body}, {
            body: {
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required().email(),
                password: Joi.string().required().min(8)
            }
        }, (err) => {
            if (err) {
                res.status(400).json({name: err.name, message: err.details[0].message})
            }
            next()
        })
    },

    validateRemoveUser: (req, res, next) => {
    Joi.validate({params: req.params}, {
        params: {
            userId: Joi.string().required().length(24)
        }
    }, (err) => {
        if (err) {
            res.status(400).json({name: err.name, message: err.details[0].message})
        }
        next()
    })
}
};