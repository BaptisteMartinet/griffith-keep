const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require('../models');

/**
 * @description Register a new user
 */
router.post('/register', async (req, res) => {
  const { password, ...args } = req.body;
  if (await User.exists({ email: args.email }))
    return res.status(409).send('User already exists.');
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    ...args,
    password: hashedPassword,
  });
  res.status(201).send('Account successfully created.');
});

/**
 * @description Login
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, '+password');
  if (!user)
    return res.status(404).send('User not found.');
  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send('Invalid credentials.');
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
  res.cookie('x-access-token', token, { expires: new Date(Date.now() + 86400000), httpOnly: true });
  res.send('Successfully logged in.')
});

module.exports = router;
