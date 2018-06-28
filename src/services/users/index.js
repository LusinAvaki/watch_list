const UsersModel = require('../../models/index').UsersModel;

function listUsers (req, res, next) {
    UsersModel.listAllUsers()
        .then((users) => {
            const response = {
                data: users,
                message: 'Successfully fetched users.'
            };
            res.status(200).json(response)
        })
        .catch(next)
}

function getUser (req, res, next) {
    const { userId } = req.params;

    UsersModel.getUserById(userId)
     .then((user) =>{
         const response = {
             data: user,
             message:'user found'
         };
         res.status(200).json(response)
     })
     .catch(next)
}

function addUser (req, res, next) {
    const { firstName, lastName, email, username, password } = req.body;

    const createData = {firstName, lastName, email, username, password};

    UsersModel.createUser(createData)
        .then((data) => {
            res.status(201).json(data)
        })
        .catch(next)
}

function updateUser (req, res, next) {
    const { userId } = req.params

    const { email, firstName, lastName, username, password } = req.body


    UsersModel.updateUserById(userId, { email, firstName, lastName, username, password })
        .then((user) => {
            const response = {
                data: user,
                message: 'Successfully updated user`s data.'
            };
            res.status(200).json(response)
        })
        .catch(next)
}

function removeUser (req, res, next) {
    const { userId } = req.params;

    UsersModel.removeUserById(userId)
        .then((user) => {
            const response = {
                data: user,
                message: 'Successfully deleted.'
            };
            res.status(200).json(response)
        })
        .catch(next)
}

module.exports = {
    listUsers,
    getUser,
    addUser,
    updateUser,
    removeUser
};