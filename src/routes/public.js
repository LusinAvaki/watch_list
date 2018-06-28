const router = require("express").Router();

const usersService = require('../services/users');
const usersValidations = require('.../middlewares/validations/users');

router.post('/sign-up',
    usersValidations.validateRegisterUser,
    usersService.registerUser
);

router.post('/sign-in',
    usersValidations.validateUserSignIn,
    usersService.signInUser
);

module.exports = router;