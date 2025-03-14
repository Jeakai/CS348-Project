const pool = require('../config/db');

exports.getUserFavourites = async (userId) => {
  const sql = `
    SELECT p.* 
    FROM players p 
    INNER JOIN favourites uf ON p.pid = uf.pid 
    WHERE uf.uid = ?`;
  const [rows] = await pool.execute(sql, [userId]);
  return rows;
};

exports.getConnection = async () => {
  return await pool.getConnection();
};

exports.addFavourite = async (uid, pid) => {
  const sql = 'INSERT IGNORE INTO favourites (uid, pid) VALUES (?, ?)';
  await pool.execute(sql, [uid, pid]);
};

exports.removeFavourite = async (uid, pid) => {
  const sql = 'DELETE FROM favourites WHERE uid = ? AND pid = ?';
  await pool.execute(sql, [uid, pid]);
};
