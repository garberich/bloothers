const employee = require('../controllers/employee.controller');
const express = require('express');
const router = express.Router();

router.get('/:id', employee.getEmployee);
router.post('/', employee.createEmployee);

module.exports = router;