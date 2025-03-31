CREATE DATABASE IF NOT EXISTS my_basketball_db;
USE my_basketball_db;

DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS favourites;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;
DROP FUNCTION IF EXISTS get_favorites_count;
DROP VIEW IF EXISTS latest_players;
DROP TRIGGER IF EXISTS set_created_at_on_insert;

CREATE TABLE teams (
  tid			INT NOT NULL PRIMARY KEY,
  team			VARCHAR(100) NOT NULL,
  abbreviation 	VARCHAR(5)
);

CREATE TABLE users (
  uid 				    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  uname				    VARCHAR(50) NOT NULL UNIQUE,
  hashed_password	VARCHAR(255) NOT NULL,
  email				    VARCHAR(100) NOT NULL UNIQUE,
  created_at      DATETIME
);

CREATE TABLE players (
  pid 			INT NOT NULL PRIMARY KEY,
  pname			VARCHAR(100) NOT NULL,
  birth_year	YEAR,
  birth_month	VARCHAR(10),
  birth_date	DATE,
  nationality	VARCHAR(100),
  high_school	VARCHAR(100),
  draft_round	INT,
  draft_pick	INT,
  draft_tid		INT,
  FOREIGN KEY (draft_tid) REFERENCES teams(tid) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_players_name (pname)
);

CREATE TABLE favourites (
  uid	INT,
  pid	INT,
  PRIMARY KEY (uid, pid),
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (pid) REFERENCES players(pid) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE members (
  pid 		INT,
  tid		INT,
  season	VARCHAR(50),
  stage		VARCHAR(50),
  gp		INT,
  min		INT,
  fgm		INT,
  fga		INT,
  threepm	INT,
  threepa	INT,
  ftm		INT,
  fta		INT,
  tov		INT,
  pf		INT,
  orb		INT,
  drb		INT,
  reb		INT,
  ast		INT,
  stl		INT,
  blk		INT,
  pts		INT,
  height	VARCHAR(10),
  height_cm	INT,
  weight	INT,
  weight_kg	INT,
  PRIMARY KEY (pid, tid, season, stage),
  FOREIGN KEY (pid) REFERENCES players(pid) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (tid) REFERENCES teams(tid) ON DELETE CASCADE ON UPDATE CASCADE
);

DELIMITER $$
CREATE FUNCTION get_favorites_count(player_id INT) RETURNS INT
DETERMINISTIC
BEGIN
  DECLARE count INT;
  SELECT COUNT(*) INTO count FROM favourites WHERE pid = player_id;
  RETURN count;
END $$
DELIMITER ;

CREATE VIEW latest_players AS
SELECT 
  p.pid AS player_id,
  p.pname AS player_name,
  p.birth_year AS birth_year,
  t.team AS team_name,
  get_favorites_count(p.pid) AS favorites_count,
  m.height_cm,
  m.weight_kg,
  SUM(m.pts) AS points
FROM players p
JOIN members m ON p.pid = m.pid
JOIN teams t ON m.tid = t.tid
WHERE m.season = '2019 - 2020'
GROUP BY p.pid, p.pname, t.team, m.height_cm, m.weight_kg;

DELIMITER $$
CREATE TRIGGER set_created_at_on_insert
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    SET NEW.created_at = NOW();
END $$