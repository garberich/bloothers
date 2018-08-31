var healthModel = require('../models/health_center');
var employeeModel = require('../models/employee');
var path = require('path');
var fs = require('fs');

const healthController = {};

// Find only one Health center filtering by id
// this no validate "status"
healthController.getHealth = async(req, res) => {
    await healthModel.findById(req.params.id).exec((err, healthFind) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });
        res.status(200).json(healthFind);
    });
};

// Find alls Health Centers whit "status" true
healthController.getHealths = (req, res) => {
    healthModel.find({ status: true }).exec((err, healthFind) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });
        res.status(200).json(healthFind);
    });
};

// Find all Health Center's employees
healthController.getEmployees = (req, res) => {
    employeeModel.find({ id_health_center: req.params.id }).exec((err, employeeFind) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });
        res.status(200).json(employeeFind);
    });
}

// Create new Health Center controling no repeats
healthController.createHealth = (req, res) => {
    const health = new healthModel(req.body);

    // Control duplicate health centers
    healthModel.find({ email: health.email.toLowerCase() }).exec((err, healthFind) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });

        if (healthFind && healthFind.length >= 1) {
            res.status(200).json({ status: 'Health center already exists' });
        } else {
            health.save();
            res.status(200).json({ status: 'Health save' });
        }
    });
};

// Edit data of Health center, except avatar
healthController.editHealth = async(req, res) => {
    const { id } = req.params;
    const health = {
        name: req.body.name,
        description: req.body.description,
        created_date: req.body.createHealth,
        city: req.body.city,
        email: req.body.email,
        phone: req.body.phone,
        cell_phone: req.body.cell_phone,
        adress: req.body.adress,
        lng: req.body.lng,
        ltd: req.body.ltd,
        status: req.body.status
    };

    await healthModel.findByIdAndUpdate(id, { $set: health }, { new: true }); // El new: true es para que cree el dato si no existe
    res.status(200).json({ status: 'Health Update' });
};

// Delete Health Center
healthController.deleteHealth = async(req, res) => {
    await healthModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ status: 'Health eliminated' });
};

// Upload Health Center's avatar
healthController.uploadAvatar = (req, res) => {
    var healthId = req.params.id;

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        //El usuario que se recibe por la URL debe ser el mismo del objeto del token; el usuario identificado
        // if (healthId != req.user.sub) {
        // 	return removeFilesOfUploads(res, file_path, 'No tienes permiso para actualizar los datos del usuario');
        // }

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            healthModel.findByIdAndUpdate(healthId, { avatar: file_name }, { new: true }, (err, healthUpdate) => {
                if (err) return removeFilesOfUploads(res, file_path, 'Error in the request');

                if (!healthUpdate) return res.status(404).send({ message: 'No is possible update the health center' });

                return res.status(200).json({ health: healthUpdate });
            });
        } else {
            return removeFilesOfUploads(res, file_path, 'Extension is no valid');
        }
    } else {
        return res.status(200).json({ message: 'Avatar no send' });
    }
};

function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).json({ message: message });
    });
}

module.exports = healthController;