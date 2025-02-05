const pool = require('../config/db');

exports.createUser = async (username, email, password) => {
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  const [result] = await pool.execute(sql, [username, email, password]);
  return result;
};

exports.updateUser = async (id, username, email, password) => {
  const sql = `
    UPDATE users 
    SET username = COALESCE(?, username),
        email = COALESCE(?, email),
        password = COALESCE(?, password)
    WHERE id = ?`;
  const [result] = await pool.execute(sql, [username, email, password, id]);
  return result;
};

exports.deleteUser = async (id) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  const [result] = await pool.execute(sql, [id]);
  return result;
};
