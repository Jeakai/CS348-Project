const pool = require('../config/db');

exports.findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?'
  const result = await pool.execute(sql, [email]);
  return result[0];
};

exports.createUser = async (username, email, hashedPassword, password) => {
  const sql = 'INSERT INTO users (uname, email, hashed_password, salt) VALUES (?, ?, ?, ?)';
  const [result] = await pool.execute(sql, [username, email, hashedPassword, password]);
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
