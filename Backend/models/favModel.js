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

exports.updateUserFavourites = async (connection, userId, playerIds) => {
  await connection.beginTransaction();
  await connection.execute('DELETE FROM favourites WHERE uid = ?', [userId]);
  const sql = 'INSERT INTO favourites (uid, pid) VALUES (?, ?)';
  for (const playerId of playerIds) {
    await connection.execute(sql, [userId, playerId]);
  }
  await connection.commit();
};
