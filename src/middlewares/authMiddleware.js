const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token nao informado' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ mensagem: 'Token invalido' });
  }

  try {
    const token = parts[1];
    const decoded = jwt.verify(token, authConfig.jwtSecret);

    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ mensagem: 'Token invalido ou expirado' });
  }
}

module.exports = authMiddleware;
