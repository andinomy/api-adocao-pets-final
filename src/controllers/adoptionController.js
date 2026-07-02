const adoptionService = require('../services/adoptionService');

async function list(req, res) {
  try {
    const adoptions = await adoptionService.listAdoptions();
    return res.json(adoptions);
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

async function create(req, res) {
  try {
    const petId = req.body.pet_id || req.body.petId;
    const adoption = await adoptionService.createAdoption(req.user.userId, petId);
    return res.status(201).json(adoption);
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

module.exports = {
  list,
  create,
};
