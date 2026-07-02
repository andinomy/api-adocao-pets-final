const db = require('../database/database');

async function create(userId, petId) {
  const [result] = await db.query(
    'INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES (?, ?, CURDATE())',
    [userId, petId],
  );

  return findById(result.insertId);
}

async function findAll() {
  const [rows] = await db.query(`
    SELECT
      adoptions.id,
      adoptions.user_id,
      users.name AS user_name,
      adoptions.pet_id,
      pets.name AS pet_name,
      adoptions.adoption_date
    FROM adoptions
    INNER JOIN users ON users.id = adoptions.user_id
    INNER JOIN pets ON pets.id = adoptions.pet_id
    ORDER BY adoptions.id
  `);

  return rows;
}

async function findById(id) {
  const [rows] = await db.query(
    `
    SELECT
      adoptions.id,
      adoptions.user_id,
      users.name AS user_name,
      adoptions.pet_id,
      pets.name AS pet_name,
      adoptions.adoption_date
    FROM adoptions
    INNER JOIN users ON users.id = adoptions.user_id
    INNER JOIN pets ON pets.id = adoptions.pet_id
    WHERE adoptions.id = ?
  `,
    [id],
  );

  return rows[0];
}

async function findByUserAndPet(userId, petId) {
  const [rows] = await db.query('SELECT * FROM adoptions WHERE user_id = ? AND pet_id = ?', [
    userId,
    petId,
  ]);

  return rows[0];
}

module.exports = {
  create,
  findAll,
  findById,
  findByUserAndPet,
};
