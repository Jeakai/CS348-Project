const pool = require('../config/db');

exports.findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?'
  const result = await pool.execute(sql, [email]);
  return result[0];
};

exports.findUserById = async (uid) => {
  const sql = 'SELECT uid, uname AS username, email FROM users WHERE uid = ?';
  const [result] = await pool.execute(sql, [uid]);
  return result.length ? result[0] : null;
};


exports.createUser = async (username, email, hashedPassword, password) => {
  const sql = 'INSERT INTO users (uname, email, hashed_password) VALUES (?, ?, ?)';
  const [result] = await pool.execute(sql, [username, email, hashedPassword]);
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
