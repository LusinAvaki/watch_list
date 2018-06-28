const Joi = require('joi');


module.exports = {
    validateGetMovie: (req, res, next) => {
        Joi.validate({params: req.params}, {
            params: {
                movieId: Joi.string().length(24).required()
            }
        }, (err) => {
            if (err) {
                res.status(400).json({name: err.name, message: err.details[0].message})
            }
            next()
        })
    },

    validateRegisterMovie: (req, res, next) => {
        Joi.validate({body: req.body}, {
            body: {
                name: Joi.string().max(100).required(),
                genre: Joi.string().required(),
                country: Joi.string().required(),
                director: Joi.string().required()
            }
        }, (err) => {
            if (err) {
                res.status(400).json({name: err.name, message: err.details[0].message})
            }
            next()
        })
    },

    validateRemoveMovie: (req, res, next) => {
        Joi.validate({params: req.params}, {
            params: {
                movieId: Joi.string().required().length(24)
            }
        }, (err) => {
            if (err) {
                res.status(400).json({name: err.name, message: err.details[0].message})
            }
            next()
        })
    }
};