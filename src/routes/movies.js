const router = require('express').Router();

const moviesValidations = require('../middleware/validation/movies');
const movieWatch = require('../services/movies/index');

router.get('/',
  movieWatch.listMovies
);

router.get('/:movieId',
  moviesValidations.validateGetMovie,
  movieWatch.getMovie
);

router.post('/',
  moviesValidations.validateRegisterMovie,
  movieWatch.addMovie
);

router.patch('/:movieId',
  movieWatch.updateMovie
);

router.delete('/:movieId',
  moviesValidations.validateRemoveMovie,
  movieWatch.removeMovie
);

module.exports = router;