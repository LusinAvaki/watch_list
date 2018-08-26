const UsersModel = require('../../models/index').UsersModel;

const SuccessHandlerUtil = require('../../util/success-handler.util');
const ErrorsUtil = require('../../util/errors.util');

const {UserNotCreatedError, UserNotFoundError, UserNotUpdatedError} = ErrorsUtil;

function listUsers(req, res, next) {
  UsersModel.listAllUsers()
    .then((users) => SuccessHandlerUtil.handleList(res, users))
    .catch(next)
}

function getUser(req, res, next) {
  const {userId} = req.params;
  
  UsersModel.getUserById(userId)
    .then((user) => {
      if (!user) {
        return Promise.reject(new UserNotFoundError('User not found.'))
      }
      SuccessHandlerUtil.handleGet(res, user)
    })
    .catch(next)
}

/**
 * @param req
 * @param res
 * @param next
 */
function addUser(req, res, next) {
  const {firstName, lastName, email, username, password} = req.body;
  
  const createData = {firstName, lastName, email, username, password};
  
  UsersModel.createUser(createData)
    .then((result) => {
      if (!result) {
        return Promise.reject(new UserNotCreatedError('User not created.'))
      }
      
      return SuccessHandlerUtil.handleCreate(res, {userId: result._id})
    })
    .catch(next)
}

function updateUser(req, res, next) {
  const {userId} = req.params;
  
  const {email, firstName, lastName, username, password} = req.body;
  
  
  UsersModel.updateUserById(userId, {email, firstName, lastName, username, password})
    .then((user) => {
      if (!user) {
        return Promise.reject(new UserNotUpdatedError('User not updated.'))
      }
      SuccessHandlerUtil.handleUpdate(res, user);
    })
    .catch(next)
}

function removeUser(req, res, next) {
  const {userId} = req.params;
  
  UsersModel.removeUserById(userId)
    .then((user) => {
      if (!user) {
        return Promise.reject(new UserNotFoundError('User not found.'))
      }
      SuccessHandlerUtil.handleDelete(res, {userId: user._id});
    })
    .catch(next)
}

function signInUser(req, res, next) {
  const {email, password} = req.body;
  
  UsersModel.signInUser({email, password})
    .then((result) => SuccessHandlerUtil.handleGet(res, {token: result.token}))
    .catch(next)
  
}

function addMovieToWatchList(req, res, next) {
  const {movieId} = req.body;
  const {userId} = req.params;
  
  UsersModel.addMovie(userId, movieId)
    .then(() => SuccessHandlerUtil.handleCreate(res, {movieId}))
  
}

function getMoviesInWatchList(req, res, next) {
  const {userId} = req.params;
  
  return UsersModel.getMovies(userId)
    .then((result) => SuccessHandlerUtil.handleList(res, result.watchList))
}

function deleteMovieFromWatchList(req, res, next) {
  const {userId, movieId} = req.params;
  return UsersModel.deleteMovie(userId, movieId)
    .then((result) => SuccessHandlerUtil.handleDelete(res, result.watchList))
}

module.exports = {
  listUsers,
  getUser,
  addUser,
  updateUser,
  removeUser,
  signInUser,
  addMovieToWatchList,
  getMoviesInWatchList,
  deleteMovieFromWatchList
};