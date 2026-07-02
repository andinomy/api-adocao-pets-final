const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const createError = require('./errorService');

function isValidRole(role) {
  return role === 'admin' || role === 'adopter';
}

async function createUser(data) {
  if (!data.name || !data.email || !data.password) {
    throw createError(400, 'Nome, email e senha sao obrigatorios');
  }

  const role = data.role || 'adopter';

  if (!isValidRole(role)) {
    throw createError(400, 'Role deve ser admin ou adopter');
  }

  const userExists = await userModel.findByEmail(data.email);

  if (userExists) {
    throw createError(400, 'Email ja cadastrado');
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  return userModel.create({
    name: data.name,
    email: data.email,
    password: passwordHash,
    phone: data.phone,
    role,
  });
}

async function listUsers() {
  return userModel.findAll();
}

async function getUserById(id, loggedUser) {
  if (loggedUser.role !== 'admin' && loggedUser.userId !== Number(id)) {
    throw createError(403, 'Voce nao pode acessar este usuario');
  }

  const user = await userModel.findById(id);

  if (!user) {
    throw createError(404, 'Usuario nao encontrado');
  }

  return user;
}

async function updateUser(id, data, loggedUser) {
  if (loggedUser.role !== 'admin' && loggedUser.userId !== Number(id)) {
    throw createError(403, 'Voce nao pode editar este usuario');
  }

  const user = await userModel.findById(id);

  if (!user) {
    throw createError(404, 'Usuario nao encontrado');
  }

  const newData = { ...data };

  if (loggedUser.role !== 'admin') {
    delete newData.role;
  }

  if (newData.role && !isValidRole(newData.role)) {
    throw createError(400, 'Role deve ser admin ou adopter');
  }

  if (newData.email) {
    const emailUser = await userModel.findByEmail(newData.email);

    if (emailUser && emailUser.id !== Number(id)) {
      throw createError(400, 'Email ja cadastrado');
    }
  }

  if (newData.password !== undefined && !newData.password) {
    throw createError(400, 'Senha nao pode ser vazia');
  }

  if (newData.password) {
    newData.password = await bcrypt.hash(newData.password, 10);
  }

  return userModel.update(id, newData);
}

async function deleteUser(id) {
  const user = await userModel.findById(id);

  if (!user) {
    throw createError(404, 'Usuario nao encontrado');
  }

  await userModel.remove(id);
}

module.exports = {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
};
