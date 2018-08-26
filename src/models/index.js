const mongoose = require('mongoose');

const MoviesModel = require('./movies/index');
const UsersModel = require('./users/index');

const models = {};

mongoose.connect('mongodb://localhost/watchList')
  .then(() => console.log('Connected to mongo.'))
  .catch(console.log);

models.UsersModel = UsersModel;
models.MoviesModel = MoviesModel;

module.exports = models;