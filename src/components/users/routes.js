import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';
import Joi from 'joi';

import User from './model';
import env from '../../config/envioroment';

const router = express.Router();

//Validation functions
const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    admin: Joi.boolean(),
  });
  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

router.post('/register', async (req, res) => {
  //Validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //Validate the email is alredy exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json({ error: 'Email alredy exists' });

  //Jasj password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    admin: req.body.admin || false,
  });

  //Try save the new user
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/login', async (req, res) => {
  //Validate the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Validate the email is alredy exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email doesnt exists');

  //check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  //Create web token
  const token = jwt.sign({ _id: user._id }, env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

export default router;
