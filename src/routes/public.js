const router = require("express").Router();

const usersService = require('../services/users');
const usersValidations = require('../middleware/validation/users');

router.post('/sign-up',
  usersValidations.validateRegisterUser,
  usersService.addUser
);

router.post('/sign-in',
  usersValidations.validateSignInUser,
  usersService.signInUser
);

module.exports = router;