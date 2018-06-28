const bcrypt = require('bcrypt');
const Promise = require('bluebird');

module.exports = (Users) => {
    /**
     * @description List all users.
     */
    Users.listAllUsers = () => {
        return Users.find({});
    };

    /**
     * @param {string} userId
     * @description get users.
     */
    Users.getUserById = (userId) => {
        return Users.findOne({_id: userId}, {password: false});
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

    Users.signInUser = (signInData) => {
        const {email, password} = signInData

        return Users.findOne({email})
            .then((user) => {
                if(user) {
                    return bcrypt.compare(password, user.password)
                        .then((result) => {
                            if(result) {
                                return {userId: user._id}
                            }
                            return Promise.reject(new Error('Wrong credentials'))
                        })
                }
                return Promise.reject(new Error('Wrong credentials'))
            })


    }
};