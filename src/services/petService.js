const petModel = require('../models/petModel');
const createError = require('./errorService');

function isValidSize(size) {
  return size === 'small' || size === 'medium' || size === 'large';
}

function isValidStatus(status) {
  return status === 'available' || status === 'adopted';
}

async function createPet(data) {
  if (!data.name || data.age === undefined || !data.species || !data.size) {
    throw createError(400, 'Nome, idade, especie e porte sao obrigatorios');
  }

  if (!isValidSize(data.size)) {
    throw createError(400, 'Size deve ser small, medium ou large');
  }

  return petModel.create({
    name: data.name,
    age: data.age,
    species: data.species,
    size: data.size,
    status: 'available',
    description: data.description,
  });
}

async function listPets() {
  return petModel.findAll();
}

async function listAvailablePets() {
  return petModel.findAvailable();
}

async function getPetById(id) {
  const pet = await petModel.findById(id);

  if (!pet) {
    throw createError(404, 'Pet nao encontrado');
  }

  return pet;
}

async function updatePet(id, data) {
  const pet = await petModel.findById(id);

  if (!pet) {
    throw createError(404, 'Pet nao encontrado');
  }

  if (data.size && !isValidSize(data.size)) {
    throw createError(400, 'Size deve ser small, medium ou large');
  }

  if (data.status && !isValidStatus(data.status)) {
    throw createError(400, 'Status deve ser available ou adopted');
  }

  return petModel.update(id, data);
}

async function deletePet(id) {
  const pet = await petModel.findById(id);

  if (!pet) {
    throw createError(404, 'Pet nao encontrado');
  }

  if (pet.status !== 'available') {
    throw createError(400, 'Pet adotado nao pode ser removido');
  }

  await petModel.remove(id);
}

module.exports = {
  createPet,
  listPets,
  listAvailablePets,
  getPetById,
  updatePet,
  deletePet,
};
