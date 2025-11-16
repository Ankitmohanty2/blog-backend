const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'fallback_secret';
  return jwt.sign({ id }, secret, {
    expiresIn: '7d'
  });
};
