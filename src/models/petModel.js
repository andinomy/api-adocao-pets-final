const db = require('../database/database');

async function create(pet) {
  const [result] = await db.query(
    'INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, ?, ?)',
    [pet.name, pet.age, pet.species, pet.size, pet.status, pet.description || null],
  );

  return findById(result.insertId);
}

async function findAll() {
  const [rows] = await db.query('SELECT * FROM pets ORDER BY id');
  return rows;
}

async function findAvailable() {
  const [rows] = await db.query('SELECT * FROM pets WHERE status = ? ORDER BY id', ['available']);
  return rows;
}

async function findById(id) {
  const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
  return rows[0];
}

async function update(id, pet) {
  const fields = [];
  const values = [];

  if (pet.name !== undefined) {
    fields.push('name = ?');
    values.push(pet.name);
  }

  if (pet.age !== undefined) {
    fields.push('age = ?');
    values.push(pet.age);
  }

  if (pet.species !== undefined) {
    fields.push('species = ?');
    values.push(pet.species);
  }

  if (pet.size !== undefined) {
    fields.push('size = ?');
    values.push(pet.size);
  }

  if (pet.status !== undefined) {
    fields.push('status = ?');
    values.push(pet.status);
  }

  if (pet.description !== undefined) {
    fields.push('description = ?');
    values.push(pet.description);
  }

  if (fields.length > 0) {
    values.push(id);
    await db.query(`UPDATE pets SET ${fields.join(', ')} WHERE id = ?`, values);
  }

  return findById(id);
}

async function remove(id) {
  const [result] = await db.query('DELETE FROM pets WHERE id = ?', [id]);
  return result.affectedRows;
}

module.exports = {
  create,
  findAll,
  findAvailable,
  findById,
  update,
  remove,
};
