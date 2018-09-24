const employee = require('../controllers/employee.controller');
const express = require('express');
const router = express.Router();

var multiparty = require('connect-multiparty');
var md_upload = multiparty({ uploadDir: './uploads/employee_avatar' });

router.get('/:id', employee.getEmployee);
router.post('/', employee.createEmployee);
router.put('/:id', employee.editEmployee);
router.delete('/:id', employee.deleteEmployee);
router.post('/upload-avatar/:id', md_upload, employee.uploadAvatar);
router.get('/download-avatar/:imageFile', employee.downloadAvatar);

module.exports = router;