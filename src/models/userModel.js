const db = require('../database/database');

async function create(user) {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
    [user.name, user.email, user.password, user.phone || null, user.role],
  );

  return findById(result.insertId);
}

async function findAll() {
  const [rows] = await db.query('SELECT id, name, email, phone, role FROM users ORDER BY id');
  return rows;
}

async function findById(id) {
  const [rows] = await db.query('SELECT id, name, email, phone, role FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function findByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function update(id, user) {
  const fields = [];
  const values = [];

  if (user.name !== undefined) {
    fields.push('name = ?');
    values.push(user.name);
  }

  if (user.email !== undefined) {
    fields.push('email = ?');
    values.push(user.email);
  }

  if (user.password !== undefined) {
    fields.push('password = ?');
    values.push(user.password);
  }

  if (user.phone !== undefined) {
    fields.push('phone = ?');
    values.push(user.phone);
  }

  if (user.role !== undefined) {
    fields.push('role = ?');
    values.push(user.role);
  }

  if (fields.length > 0) {
    values.push(id);
    await db.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
  }

  return findById(id);
}

async function remove(id) {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows;
}

module.exports = {
  create,
  findAll,
  findById,
  findByEmail,
  update,
  remove,
};
