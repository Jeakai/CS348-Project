require('dotenv').config();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

exports.checkStatus = (_, res) => {
    res.json({ message: 'Success' });
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser[0]) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.createUser(username, email, hashedPassword, password);
    res.status(201).json({ message: 'User registered', userId: result.insertId });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await userModel.findUserByEmail(email);
    
    if (!user[0]) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const hashedPassword = user[0].hashed_password;

    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};


exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const result = await userModel.updateUser(id, username, email, password);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated' });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userModel.deleteUser(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};
