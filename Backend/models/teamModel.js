const pool = require('../config/db');

exports.getTeams = async () => {
  const sql = 'SELECT * FROM teams';
  const [rows] = await pool.execute(sql);
  return rows;
};

exports.getTeamDetails = async (teamAbbr, searchQuery, seasonQuery) => {
  console.log("Fetching details for:", teamAbbr);
  
  let sql = `
  SELECT t.tid, t.team, t.abbreviation, p.pid, p.pname AS player_name, m.season, m.pts
  FROM teams t
  JOIN members m ON t.tid = m.tid
  JOIN players p ON m.pid = p.pid
  WHERE t.abbreviation = ?
  `;


  let params = [teamAbbr];

  if(searchQuery){
    sql += ' AND LOWER(p.pname) LIKE ?';
    params.push(`%${searchQuery}%`);
  }

  if(seasonQuery){
    sql += ' AND m.season = ?';
    params.push(seasonQuery);
  }

  try {
    const [rows] = await pool.execute(sql, params);
    console.log("Query Result:", rows);  // Log the result here

    if (rows.length === 0) {
      console.log(`No results found for abbreviation: ${teamAbbr}`);
      return null;
    }

    const team = {
      tid: rows[0].tid,
      abbreviation: rows[0].abbreviation,
      team: rows[0].team,
      players: rows.map(row => ({
        pid: row.pid,
        name: row.player_name,
        season: row.season,
        pts: row.pts
      })).filter(player => player.pid !== null)  // Ensure players with no ID are filtered
    };

    //console.log("FINAL Team Details:", team);  // Log the final team object
    return team;
  } catch (error) {
    console.error("Error fetching team details:", error);
    throw error;
  }
};
