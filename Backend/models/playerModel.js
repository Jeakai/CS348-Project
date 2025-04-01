const pool = require('../config/db');

exports.getPlayers = async (search, sortBy, order, groupBy) => {
  let sql = 'SELECT * FROM players JOIN members ON players.pid = members.pid';
  const params = [];
  
  if (search) {
    sql += ' WHERE pname LIKE ?';
    params.push(`%${search}%`);
  }

  if (groupBy) { // not used in the frontend
    sql += ` GROUP BY ${groupBy}`;
  }

  if (sortBy) { // player sorting
    const sortOrder = order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    sql += ` ORDER BY ${sortBy} ${sortOrder}`;
  }

  console.log("SQL", sql);
  console.log("params", params);
  const [rows] = await pool.execute(sql, params);

  console.log("playerModel:", rows[1]);
  return rows;
};

exports.getLatestPlayers = async () => {
  let sql = 'SELECT * FROM latest_players';

  console.log("SQL", sql);
  const [rows] = await pool.query(sql);

  console.log("playerModel:", rows);
  return rows;
};
