const adoptionModel = require('../models/adoptionModel');
const petModel = require('../models/petModel');
const createError = require('./errorService');

async function listAdoptions() {
  return adoptionModel.findAll();
}

async function createAdoption(userId, petId) {
  if (!petId) {
    throw createError(400, 'pet_id e obrigatorio');
  }

  const pet = await petModel.findById(petId);

  if (!pet) {
    throw createError(404, 'Pet nao encontrado');
  }

  const oldAdoption = await adoptionModel.findByUserAndPet(userId, petId);

  if (oldAdoption) {
    throw createError(400, 'Usuario ja adotou esse pet');
  }

  if (pet.status !== 'available') {
    throw createError(400, 'Pet nao disponivel');
  }

  const adoption = await adoptionModel.create(userId, petId);
  await petModel.update(petId, { status: 'adopted' });

  return adoption;
}

module.exports = {
  listAdoptions,
  createAdoption,
};
