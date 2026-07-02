const petService = require('../services/petService');

async function create(req, res) {
  try {
    const pet = await petService.createPet(req.body);
    return res.status(201).json(pet);
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

async function list(req, res) {
  try {
    const pets = await petService.listPets();
    return res.json(pets);
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

async function listAvailable(req, res) {
  try {
    const pets = await petService.listAvailablePets();
    return res.json(pets);
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

async function findById(req, res) {
  try {
    const pet = await petService.getPetById(req.params.id);
    return res.json(pet);
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

async function update(req, res) {
  try {
    const pet = await petService.updatePet(req.params.id, req.body);
    return res.json(pet);
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

async function remove(req, res) {
  try {
    await petService.deletePet(req.params.id);
    return res.json({ mensagem: 'Pet removido com sucesso' });
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

module.exports = {
  create,
  list,
  listAvailable,
  findById,
  update,
  remove,
};
