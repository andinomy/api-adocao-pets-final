const authService = require('../services/authService');

async function login(req, res) {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ mensagem: error.message });
  }
}

module.exports = {
  login,
};
