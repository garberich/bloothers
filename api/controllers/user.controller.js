const UserModel = require('../models/user');
const fs = require('fs');
const path = require('path');

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

// Edit an existing user
// This method is only for user use
userController.editUser = async(req, res) => {
    let idUser = req.params.id;
    let user = {
        name: req.body.name,
        last_name: req.body.last_name,
        city: req.body.city,
        password: req.body.password,
        phone: req.body.phone,
        cell_phone: req.body.cell_phone
    }

    await UserModel.findByIdAndUpdate(idUser, { $set: user });
    res.status(200).json({ status: 'User update' });
};

// Delete an existing user
userController.deleteUser = async(req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).exec((err) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });

        return res.status(200).json({ status: 'User deleted' });
    });
};

// Upload User's avatar
userController.uploadAvatar = (req, res) => {
    let userId = req.params.id;

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        //El usuario que se recibe por la URL debe ser el mismo del objeto del token; el usuario identificado
        // if (userId != req.user.sub) {
        // 	return removeFilesOfUploads(res, file_path, 'No tienes permiso para actualizar los datos del usuario');
        // }

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            UserModel.findByIdAndUpdate(userId, { avatar: file_name }, { new: true }, (err, userUpdate) => {
                if (err) return removeFilesOfUploads(res, file_path, 'Error in the request');

                if (!userUpdate) return res.status(404).send({ status: 'No is possible update the user' });

                return res.status(200).json({ user: userUpdate });
            });
        } else {
            return removeFilesOfUploads(res, file_path, 'Extension is no valid');
        }
    } else {
        return res.status(200).json({ status: 'Avatar no send' });
    }
};

function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).json({ status: message });
    });
};

userController.downloadAvatar = (req, res) => {
    let imageFile = req.params.imageFile;
    let pathFile = './uploads/user_avatar/' + imageFile;

    fs.exists(pathFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).json({ status: 'Avatar not found' });
        }
    });
};

userController.addAchievement = (req, res) => {
    let idUser = req.body.iduser;
    let idAchievement = req.body.idachievement;

    UserModel.findById(idUser).exec((err, userFind) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });

        userFind.Achievement.push(idAchievement);

        UserModel.findByIdAndUpdate(idUser, { Achievement: userFind.Achievement }, { new: true }, (err, userUpdate) => {
            if (err) return res.status(505).json({ status: 'Error in the request' });

            if (!userUpdate) return res.status(404).send({ status: 'No is possible update the user' });

            return res.status(200).json({ user: userUpdate });
        });
    });
};

module.exports = userController;