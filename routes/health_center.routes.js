var express = require('express');
var healthController = require('../controllers/health_center.controller');
var router = express.Router();

var multiparty = require('connect-multiparty');
var md_upload = multiparty({ uploadDir: './uploads/health_center_avatar' });

router.get('/', healthController.getHealths);
router.post('/', healthController.createHealth);
router.get('/:id', healthController.getHealth);
router.put('/:id', healthController.editHealth);
router.delete('/:id', healthController.deleteHealth);
router.post('/upload-avatar/:id', md_upload, healthController.uploadAvatar);
router.get('/download-avatar/:imageFile', healthController.downloadAvatar);
router.get('/get-employee/:id', healthController.getEmployees);

module.exports = router;