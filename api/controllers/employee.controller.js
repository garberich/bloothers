var employeeModel = require('../models/employee');
var path = require('path');
var fs = require('fs');

const employeeController = {};

// Find only one Employee filtering by id
// this no validate "status"
employeeController.getEmployee = async(req, res) => {
    const employee = await employeeModel.findById(req.params.id).exec((err, employeeFind) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });
        res.status.json(employee);
    });
};

// Retrun all employees where "status" is true
employeeController.getEmployees = (req, res) => {
    employeeModel.find({ status: true }).exec((err, employees) => {
        if (err) return res.status(500).send({ status: 'Error in the request' })
        return res.status(200).json(employees);
    });
};

// create new employee controling no repeats
employeeController.createEmployee = (req, res) => {
    const employee = new employeeModel(req.body);

    // Control duplicate Employees
    employeeModel.find({ email: employee.email.toLowerCase() }).exec((err, employeeFind) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });

        if (employeeFind && employeeFind.length >= 1) {
            res.status(200).json({ status: 'Employee exists' });
        } else {
            employee.save();
            res.status(200).json({ status: 'Employee save' });
        }
    });
};

// Edit an existing employee
// This method is only for employee use
employeeController.editEmployee = async(req, res) => {
    let idEmployee = req.params.id;
    let employee = {
        name: req.body.name,
        last_name: req.body.last_name,
        city: req.body.city,
        password: req.body.password,
        phone: req.body.phone,
        cell_phone: req.body.cell_phone
    }

    await employeeModel.findByIdAndUpdate(idEmployee, { $set: employee });
    res.status(200).json({ status: 'Employee update' });
};

// Delete an existing employee
employeeController.deleteEmployee = async(req, res) => {
    await employeeModel.findByIdAndRemove(req.params.id).exec((err) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });

        return res.status(200).json({ status: 'Employee Deleted' });
    });
};

// Upload Employee's avatar
employeeController.uploadAvatar = (req, res) => {
    let employeeId = req.params.id;

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        //El usuario que se recibe por la URL debe ser el mismo del objeto del token; el usuario identificado
        // if (employeeId != req.user.sub) {
        // 	return removeFilesOfUploads(res, file_path, 'No tienes permiso para actualizar los datos del usuario');
        // }

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            employeeModel.findByIdAndUpdate(employeeId, { avatar: file_name }, { new: true }, (err, employeeUpdate) => {
                if (err) return removeFilesOfUploads(res, file_path, 'Error in the request');

                if (!employeeUpdate) return res.status(404).send({ message: 'No is possible update the employee' });

                return res.status(200).json({ health: employeeUpdate });
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
        return res.status(200).json({ message: message });
    });
};

employeeController.downloadAvatar = (req, res) => {
    let imagefile = req.params.imageFile;
    let pathFile = './uploads/employee_avatar/' + imagefile;

    fs.exists(pathFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).json({ status: 'Avatar not found' });
        }
    });
};

module.exports = employeeController;