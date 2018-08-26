const router = require('express').Router();

const usersValidations = require('../middleware/validation/users');
const userService = require('../services/users/index');

const usersMiddleware = require('../middleware/users');

router.get('/',
  userService.listUsers
);

router.get('/:userId',
  usersValidations.validateGetUser,
  userService.getUser
);

router.post('/',
  usersValidations.validateRegisterUser,
  userService.addUser
);

router.patch('/:userId',
  usersMiddleware.isOwner,
  userService.updateUser
);

router.delete('/:userId',
  usersValidations.validateRemoveUser,
  usersMiddleware.isOwner,
  userService.removeUser
);

router.get('/:userId/watch-list',
  usersMiddleware.isOwner,
  userService.getMoviesInWatchList
);

router.post('/:userId/watch-list',
  usersMiddleware.isOwner,
  userService.addMovieToWatchList
);

router.delete('/:userId/watch-list/:movieId',
  usersMiddleware.isOwner,
  userService.deleteMovieFromWatchList
);

module.exports = router;