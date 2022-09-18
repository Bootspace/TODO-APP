const express = require('express');
const Todo = require('../models/todo_model');

exports.createTodo = async(req, res) => {
  try {
    const user = req.user;
    const { title, body } = req.body;
    const todo = await Todo.create({ user, title, body });
    console.log(todo);
    return res.status(200).json({ status:'successful', message: todo });
  } catch (error) {
    console.log('Internal server error');
    res.status(500).json({ status: 'failed', message:"Internal server error"});
  }
}

exports.getAll = async(req, res) => {
  try{
    let Todos = await Todo.find();
    console.log(Todos);
    return res.status(200).json({ status: "successful", message:Todos })
  }
  catch {
    console.log('Internal server error');
    res.status(500).json({ status: 'failed', message:"Internal server error"});
  }
}

exports.editTodo = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const{ title, body } = req.body
    const updatedTodo = await Todo.findByIdAndUpdate(id, { user, ...req.body}, { new: true, runValidator:true });
    console.log(updatedTodo);
    return res.status(200).json({ status:'successful', message: updatedTodo });
  } catch (error) {
    console.log('Internal server error');
    res.status(500).json({ status: 'failed', message: error.message });
  }
}

exports.deleteTodo = async(req, res) => {
  try {
    const id = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    console.log('Todo Deleted');
    return res.status(200).json({ status:'succesful', message:"Todo succesfully deleted" });
  } catch (error) {
    console.log('Internal server error');
    res.status(500).json({ status: 'failed', message: error.message });
  }
}