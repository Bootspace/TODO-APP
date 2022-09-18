const express = require('express');
const todo = express.Router();
const { isAuthUser } = require('../config/is_Auth');
const todoController = require('../controllers/todo_controller');

todo.post('/create', isAuthUser, todoController.createTodo);
todo.get('/getAll', todoController.getAll);
todo.put('/update/:id', isAuthUser, todoController.editTodo);
todo.delete('/delete/:id', isAuthUser, todoController.deleteTodo);
module.exports = todo;