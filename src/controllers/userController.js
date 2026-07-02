const userService = require('../services/userService');

async function create(req, res) {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

async function list(req, res) {
  try {
    const users = await userService.listUsers();
    return res.json(users);
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

async function findById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id, req.user);
    return res.json(user);
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

async function update(req, res) {
  try {
    const user = await userService.updateUser(req.params.id, req.body, req.user);
    return res.json(user);
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

async function remove(req, res) {
  try {
    await userService.deleteUser(req.params.id);
    return res.json({ mensagem: 'Usuario removido com sucesso' });
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

module.exports = {
  create,
  list,
  findById,
  update,
  remove,
};
