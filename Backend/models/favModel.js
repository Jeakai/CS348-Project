const pool = require('../config/db');

exports.getUserFavourites = async (userId) => {
  const sql = `
    SELECT p.* 
    FROM players p 
    INNER JOIN user_favourites uf ON p.id = uf.player_id 
    WHERE uf.user_id = ?`;
  const [rows] = await pool.execute(sql, [userId]);
  return rows;
};

exports.getConnection = async () => {
  return await pool.getConnection();
};

exports.updateUserFavourites = async (connection, userId, playerIds) => {
  await connection.beginTransaction();
  await connection.execute('DELETE FROM user_favourites WHERE user_id = ?', [userId]);
  const sql = 'INSERT INTO user_favourites (user_id, player_id) VALUES (?, ?)';
  for (const playerId of playerIds) {
    await connection.execute(sql, [userId, playerId]);
  }
  await connection.commit();
};
