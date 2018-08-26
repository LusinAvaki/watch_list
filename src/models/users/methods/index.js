const crypto = require('crypto');

const bcrypt = require('bcrypt');
const Promise = require('bluebird');

const ErrorsUtil = require('../../../util/errors.util');

module.exports = (Users) => {
  /**
   * @description List all users.
   */
  Users.listAllUsers = () => {
    return Users.find({}, {password: false, token: false});
  };
  
  /**
   * @param {string} token
   * @description get users.
   */
  Users.getUserByToken = (token) => {
    return Users.findOne({token}, {password: false})
  };
  
  /**
   * @param {string} userId
   * @description get users.
   */
  Users.getUserById = (userId) => {
    return Users.findOne({_id: userId}, {password: false, token: false})
  };
  
  /**
   * @param {Object} userData
   * @param {string} userData.email
   * @description create users.
   */
  Users.createUser = (userData) => {
    return Users.create(userData);
  };
  
  /**
   * @description remove users.
   */
  Users.removeUserById = (userId) => {
    return Users.findOneAndDelete({_id: userId});
  };
  
  /**
   * @description update users.
   */
  Users.updateUserById = (userId, updateData) => {
    return Users.findOneAndUpdate({_id: userId}, updateData, {new: true});
  };
  
  /**
   * @param {Object} signInData
   * @param {string} signInData.email
   * @param {string} signInData.password
   * @returns {Promise}
   */
  Users.signInUser = (signInData) => {
    const {email, password} = signInData;
    let user;
    
    return Users.findOne({email})
      .then((_user) => {
        if (!_user) {
          return Promise.reject(new ErrorsUtil.InvalidInputError)
        }
        user = _user;
        
        return bcrypt.compare(password, user.password);
      })
      .then((result) => {
        if (!result) {
          return Promise.reject(new ErrorsUtil.InvalidInputError)
        }
        
        user.token = crypto.createHash('sha1').update(email + Date.now()).digest('hex');
        
        return user.save()
      })
  };
  
  /**
   * @param userId
   * @param movieId
   */
  Users.addMovie = (userId, movieId) => {
    
    return Users.findOneAndUpdate(
      {_id: userId},
      {$push: {'watchList': movieId}},
      {new: true}
    )
  };
  
  /**
   * @param userId
   * @param movieId
   */
  Users.deleteMovie = (userId, movieId) => {
    
    return Users.findOneAndUpdate(
      {_id: userId},
      {$pull: {'watchList': movieId}},
      {new: true}
    )
  };
  
  /**
   * @param userId
   * @returns {Query}
   */
  
  Users.getMovies = (userId) => {
    return Users.findOne({_id: userId}, {password: false}).populate('watchList')
  }
};