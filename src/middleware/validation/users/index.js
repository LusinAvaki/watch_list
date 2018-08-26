const Joi = require('joi');
const ErrorsUtil = require('../../../util/errors.util');

const {InvalidInputError} = ErrorsUtil;

module.exports = {
  validateSignInUser: (req, res, next) => {
    const {error} = Joi.validate({body: req.body}, {
      body: {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8)
      }
    });
    
    if (error) {
      res.status(400).json({name: error.name, message: error.details[0].message})
    }
    next()
  },
  
  validateGetUser: (req, res, next) => {
    Joi.validate({params: req.params}, {
      params: {
        userId: Joi.string().length(24).required()
      }
    });
    
      if (error) {
        res.status(400).json({name: error.name, message: error.details[0].message})
      }
      next()
  },
  
  validateRegisterUser: (req, res, next) => {
    const {error} = Joi.validate({body: req.body}, {
      body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8)
      }
    });
    
    if (error) {
      res.status(400).json({name: error.name, message: error.details[0].message})
    }
    next()
  },
  
  validateRemoveUser: (req, res, next) => {
    Joi.validate({params: req.params}, {
      params: {
        userId: Joi.string().required().length(24)
      }
    });
    
      if (error) {
        res.status(400).json({name: error.name, message: error.details[0].message})
      }
      next()
  }
};