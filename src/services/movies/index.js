const MoviesModel = require('../../models/index').MoviesModel;


function listMovies(req, res, next) {
  MoviesModel.listAllMovies()
    .then((movies) => {
      const response = {
        data: movies,
        message: 'Successfully fetched movies.'
      };
      res.status(200).json(response)
    })
    .catch(next)
}

function getMovie(req, res, next) {
  const {movieId} = req.params;
  
  MoviesModel.getMovieById(movieId)
    .then((movie) => {
      const response = {
        data: movie,
        message: 'movie found'
      };
      res.status(200).json(response)
    })
    .catch(next)
}

function addMovie(req, res, next) {
  const {name, genre, country, director, desciption} = req.body;
  
  const createData = {name, genre, country, director, desciption};
  
  MoviesModel.createMovie(createData)
    .then((data) => {
      res.status(201).json(data)
    })
    .catch(next)
}

function updateMovie(req, res, next) {
  const {movieId} = req.params;
  
  MoviesModel.updateMovieById(movieId)
    .then((movie) => {
      const response = {
        data: movie,
        message: 'Successfully updated.'
      };
      res.status(200).json(response)
    })
    .catch(next)
}

function removeMovie(req, res, next) {
  const {movieId} = req.params;
  
  MoviesModel.removeMovieById(movieId)
    .then((movie) => {
      const response = {
        data: movie,
        message: 'Successfully deleted.'
      };
      res.status(200).json(response)
    })
    .catch(next)
}

module.exports = {
  listMovies,
  getMovie,
  addMovie,
  updateMovie,
  removeMovie
};