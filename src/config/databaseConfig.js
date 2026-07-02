require('dotenv').config({ quiet: true });

module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pets_db',
  waitForConnections: true,
  connectionLimit: 10,
};
