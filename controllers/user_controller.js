const express = require('express');
const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const {generateJWT} = require('../config/helper');

exports.createuser = async(req, res) => {
  try {
    const{ firstname, lastname, email } = req.body;
    let verifiedEmail = await User.findOne({ email });
    if(verifiedEmail) {
      console.log('User already exists');
      return res.status(400).json({ status:'failed', message:'User exists already' });
    }
    let salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req.body.password, salt);

    const user = new User({ firstname, lastname, email, password });

    let newUser = await user.save();
    let data = {
      status: 'Success',
      message: newUser
    };
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log('Internal Error');
    return res.status(500).json({ status:'failed', message:'Internal Error' })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
      console.log('User do not exist');
      return res.status(400).json({ status:'failed', message:'User do not exist' });
    }

    let verifiedPassword = await bcrypt.compare(password, user.password);
    if(!verifiedPassword) {
      console.log('Invalid credentials');
      return res.status(400).json({ status:'failed', message:'Invalid credentials' });
    }

    let token = await generateJWT(user);
    user.token = token;
    await user.save();
        console.log(user);
        return res.status(200).json({ status: 'success', message:user});
    
  } catch (error) {
    console.log('Internal Error');
    return res.status(500).json({ status:'failed', message:'Internal Error' });
  }
}