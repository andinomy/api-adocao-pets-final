require('dotenv').config({ quiet: true });

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'segredo_pets',
  jwtExpiresIn: '1h',
};
