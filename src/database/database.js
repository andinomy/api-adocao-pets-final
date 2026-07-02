const mysql = require('mysql2/promise');
const databaseConfig = require('../config/databaseConfig');

const db = mysql.createPool(databaseConfig);

module.exports = db;
