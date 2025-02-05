const pool = require('../config/db');

exports.getPlayers = async (search, sortBy, order, groupBy) => {
  let sql = 'SELECT * FROM players';
  const params = [];
  
  if (search) {
    sql += ' WHERE player_name LIKE ?';
    params.push(`%${search}%`);
  }

  if (groupBy) {
    sql += ` GROUP BY ${groupBy}`;
  }

  if (sortBy) {
    const sortOrder = order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    sql += ` ORDER BY ${sortBy} ${sortOrder}`;
  }

  const [rows] = await pool.execute(sql, params);
  return rows;
};

exports.getPlayerSeasons = async (playerId) => {
  const sql = 'SELECT * FROM seasons_stats WHERE player_id = ? ORDER BY season DESC';
  const [rows] = await pool.execute(sql, [playerId]);
  return rows;
};
