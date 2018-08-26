const ERROR_CASES = {
  InvalidInputError: {
    status: 400,
    code: 'BadRequest'
  },
  
  PathNotFoundError: {
    status: 404,
    code: 'NotFound'
  },
  
  UserNotFoundError: {
    status: 404,
    code: 'NotFound'
  },
  UserNotCreated: {
    status: 400,
    code: 'BadRequest'
  },
  UserNotUpdated: {
    status: 400,
    code: 'BadRequest'
  },
  
  UserNotAuthorizedError: {
    status: 403,
    code: 'Forbidden'
  },
  
  UserNotResourceOwnerError: {
    status: 403,
    code: 'Forbidden'
  },
  
  DEFAULT: {
    status: 500,
    code: 'InternalServerError'
  }
};


module.exports = {
  /**
   * @param {Object} err
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {*}
   */
  handleError: (err, req, res, next) => {
    const errorCase = ERROR_CASES[err.name] || ERROR_CASES.DEFAULT;
    
    return res.status(errorCase.status).json({
      message: errorCase.message || err.message,
      status: errorCase.status,
      code: errorCase.code
    });
  }
};
