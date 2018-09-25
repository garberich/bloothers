var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');

var multiparty = require('connect-multiparty');
var md_upload = multiparty({ uploadDir: './uploads/user_avatar' });


router.get('/:id', userController.getUser);
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);
router.post('/upload-avatar/:id', md_upload, userController.uploadAvatar);
router.get('/download-avatar/:imageFile', userController.downloadAvatar);
router.post('/add-achievement/', userController.addAchievement);

module.exports = router;