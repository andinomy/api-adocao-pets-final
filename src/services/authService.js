const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');
const userModel = require('../models/userModel');
const createError = require('./errorService');

async function login(email, password) {
  if (!email || !password) {
    throw createError(400, 'Email e senha sao obrigatorios');
  }

  const user = await userModel.findByEmail(email);

  if (!user) {
    throw createError(401, 'Email ou senha invalidos');
  }

  const passwordOk = await bcrypt.compare(password, user.password);

  if (!passwordOk) {
    throw createError(401, 'Email ou senha invalidos');
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, authConfig.jwtSecret, {
    expiresIn: authConfig.jwtExpiresIn,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
}

module.exports = {
  login,
};
