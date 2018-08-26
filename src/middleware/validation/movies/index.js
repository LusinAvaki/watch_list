const Joi = require('joi');


module.exports = {
  validateGetMovie: (req, res, next) => {
    Joi.validate({params: req.params}, {
      params: {
        movieId: Joi.string().length(24).required()
      }
    });
    
    if (error) {
      res.status(400).json({name: error.name, message: error.details[0].message})
    }
    next()
  },
  
  validateRegisterMovie: (req, res, next) => {
    Joi.validate({body: req.body}, {
      body: {
        name: Joi.string().max(100).required(),
        genre: Joi.string().required(),
        country: Joi.string().required(),
        director: Joi.string().required()
      }
    });
    
    if (error) {
      res.status(400).json({name: error.name, message: error.details[0].message})
    }
    next()
  },
  
  validateRemoveMovie: (req, res, next) => {
    Joi.validate({params: req.params}, {
      params: {
        movieId: Joi.string().required().length(24)
      }
    });
    
    if (error) {
      res.status(400).json({name: error.name, message: error.details[0].message})
    }
    next()
  }
};