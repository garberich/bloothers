var UserModel = require('../models/user');

const userController = {};

// Find only one User filtering by id
// this no validate "status"
userController.getUser = async(req, res) => {
    await UserModel.findById(req.params.id).exec((err, userFind) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });
        res.status(200).json(userFind);
    });
};

// Find alls Users whit "status" true
userController.getUsers = (req, res) => {
    UserModel.find({ status: true }).exec((err, usersFind) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });
        res.status(200).json({ usersFind });
    });
}

// Create new User controling no repeats
userController.createUser = (req, res) => {
    const user = new UserModel(req.body);

    // Control duplicate Users
    UserModel.find({ email: user.email.toLowerCase() }).exec((err, userFind) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });

        if (userFind && userFind.length >= 1) {
            res.status(200).json({ status: 'User already exists' });
        } else {
            user.save();
            res.status(200).json({ status: 'User save' });
        }
    });
};

module.exports = userController;