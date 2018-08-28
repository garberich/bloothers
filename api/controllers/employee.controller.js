var employeeModel = require('../models/employee');

const employeeController = {};

// Find only one Employee filtering by id
// this no validate "status"
employeeController.getEmployee = async(req, res) => {
    const employee = await employeeModel.findById(req.params.id).exec((err, employeeFind) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });
        res.status.json(employee);
    });
};

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

module.exports = employeeController;