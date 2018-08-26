const bcrypt = require('bcrypt');


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setModelMethods = require('./methods/index');

const UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      index: true
    },
    token: {
      type: String,
      index: true
    },
    watchList: [{
      type: Schema.Types.ObjectId,
      ref: 'Movies'
    }]
  })
;

UsersSchema.pre('save', function (next) {
  const self = this;
  
  if (self.isModified('password') === true) {
    bcrypt.hash(self.password, 10)
      .then((hash) => {
        self.password = hash;
        next();
      })
      .catch(next)
  } else {
    next()
  }
  
});


const Users = mongoose.model('Users', UsersSchema);

setModelMethods(Users);

module.exports = Users;