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
