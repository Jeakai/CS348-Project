const pool = require("../config/db");

exports.getTeams = async () => {
  const sql = "SELECT * FROM teams";
  const [rows] = await pool.execute(sql);
  return rows;
};

exports.getTeamDetails = async (teamAbbr, searchQuery, seasonQuery) => {
  console.log("Fetching details for:", teamAbbr);

  let sql = `
    WITH combined_pts (pid, tid, season, pts) AS (
      SELECT pid, tid, season, SUM(pts) pts
      FROM members
      WHERE tid IN (SELECT tid FROM teams WHERE abbreviation = ?)
      GROUP BY pid, tid, season
    )
    SELECT t.tid, t.team, t.abbreviation, p.pid, p.pname player_name, cp.season, cp.pts 
    FROM combined_pts cp
    JOIN players p ON p.pid = cp.pid
    JOIN teams t ON t.tid = cp.tid
    WHERE 1=1
  `;

  let params = [teamAbbr];

  if (searchQuery) {
    sql += " AND LOWER(p.pname) LIKE ?";
    params.push(`%${searchQuery}%`);
  }

  if (seasonQuery) {
    sql += " AND cp.season = ?";
    params.push(seasonQuery);
  }

  sql += " ORDER BY cp.pts DESC, p.pname ASC";

  try {
    const [rows] = await pool.execute(sql, params);
    console.log("Query Result:", rows); // Log the result here

    if (rows.length === 0) {
      console.log(`No results found for abbreviation: ${teamAbbr}`);
      return null;
    }

    const team = {
      tid: rows[0].tid,
      abbreviation: rows[0].abbreviation,
      team: rows[0].team,
      players: rows
        .map((row) => ({
          pid: row.pid,
          name: row.player_name,
          season: row.season,
          pts: row.pts,
        }))
        .filter((player) => player.pid !== null), // Ensure players with no ID are filtered
    };

    //console.log("FINAL Team Details:", team);  // Log the final team object
    return team;
  } catch (error) {
    console.error("Error fetching team details:", error);
    throw error;
  }
};
