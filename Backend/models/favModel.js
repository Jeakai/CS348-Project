const pool = require('../config/db');

exports.getUserFavourites = async (userId) => {
  const sql = `
    SELECT *
    FROM latest_players lp
    INNER JOIN favourites uf ON lp.player_id = uf.pid 
    WHERE uf.uid = ?`;
  const [rows] = await pool.execute(sql, [userId]);
  console.log("who are my favourites?", rows);
  return rows;
};

exports.getConnection = async () => {
  return await pool.getConnection();
};

// exports.addFavourite = async (uid, pid) => {
//   const sql = 'INSERT IGNORE INTO favourites (uid, pid) VALUES (?, ?)';
//   await pool.execute(sql, [uid, pid]);
// };

// exports.removeFavourite = async (uid, pid) => {
//   const sql = 'DELETE FROM favourites WHERE uid = ? AND pid = ?';
//   await pool.execute(sql, [uid, pid]);
// };

exports.toggleUserFavourite = async (connection, uid, pid) => {
  // console.log("Toggling favorite for uid:", uid, "pid:", pid);
  await connection.beginTransaction();
  const sql = `
    DELETE FROM favourites 
    WHERE uid = ? AND pid = ?`;
  const [rows] = await connection.execute(sql, [uid, pid]);
  if (rows.affectedRows === 0) {
    await connection.execute('INSERT INTO favourites (uid, pid) VALUES (?, ?)', [uid, pid]);
  }
  await connection.commit();
};
