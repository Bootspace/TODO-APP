const express = require('express');
const user = express.Router();
const userController = require('../Controllers/user_controller');

user.post('/create', userController.createuser);
user.post('/login', userController.login);
module.exports = user;