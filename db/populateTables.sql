USE my_basketball_db;

-- Replace 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/' with secure_file_priv path in your MySQL configuration if necessary.

-- Load Teams
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/teams.csv'
INTO TABLE teams
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(tid, team, abbreviation);

-- Load Players
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/players.csv'
INTO TABLE players
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(pid, pname, birth_year, birth_month, birth_date, nationality, high_school, draft_round, draft_pick, draft_tid);

-- Load Users
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/users.csv'
INTO TABLE users
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(uname, hashed_password, email);

-- Load Favourites
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/favourites.csv'
INTO TABLE favourites
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(uid, pid);

-- Load Members (seasonal stats)
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/members.csv'
INTO TABLE members
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(pid, tid, season, stage, gp, min, fgm, fga, threepm, threepa,
 ftm, fta, tov, pf, orb, drb, reb, ast, stl, blk, pts,
 height, height_cm, weight, weight_kg);
