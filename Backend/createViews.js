const pool = require('./config/db');

async function createLatestPlayersView() {
  const query = `
    CREATE OR REPLACE VIEW latest_players AS
    SELECT 
        p.pid AS player_id,
        p.pname AS player_name,
        p.birth_year AS birth_year,
        t.team AS team_name,
        COUNT(f.uid) AS favorites_count,
        m.height_cm,
        m.weight_kg
    FROM players p
    JOIN members m ON p.pid = m.pid
    JOIN teams t ON m.tid = t.tid
    LEFT JOIN favourites f ON p.pid = f.pid
    WHERE m.season = '2019 - 2020'
    GROUP BY p.pid, p.pname, t.team, m.height_cm, m.weight_kg;
  `;

  try {
    await pool.query(query); // Execute the query using your database connection
    console.log('View "latest_players" created successfully.');
  } catch (error) {
    console.error('Error creating view:', error);
  }
}

// Export the function for use in the main app
module.exports = { createLatestPlayersView };