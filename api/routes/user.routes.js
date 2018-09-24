var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');

router.get('/:id', userController.getUser);
router.get('/', userController.getUsers);
router.post('/', userController.createUser);

module.exports = router;