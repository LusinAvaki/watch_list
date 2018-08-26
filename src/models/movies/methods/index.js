module.exports = (Movies) => {
  /**
   * @description List all movies.
   */
  Movies.listAllMovies = () => {
    return Movies.find({});
  };
  
  /**
   * @param {string} movieId
   * @description get movies.
   */
  Movies.getMovieById = (movieId) => {
    return Movies.findOne({_id: movieId});
  };
  
  /**
   * @param {Object} movieData
   * @param {string} movieData.email
   * @description create movies.
   */
  Movies.createMovie = (movieData) => {
    return Movies.create(movieData);
  };
  
  /**
   * @description remove movies.
   */
  Movies.removeMovieById = (movieId) => {
    return Movies.findOneAndDelete({_id: movieId});
  };
  
  /**
   * @description update movies.
   */
  Movies.updateMovieById = (movieId, updateData) => {
    return Movies.findOneAndUpdate({_id: movieId}, updateData, {new: true});
  }
};