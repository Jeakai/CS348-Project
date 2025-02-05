const pool = require('../config/db');

exports.getTeams = async () => {
  const sql = 'SELECT * FROM teams';
  const [rows] = await pool.execute(sql);
  return rows;
};
