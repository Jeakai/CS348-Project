CREATE DATABASE IF NOT EXISTS my_basketball_db;
USE my_basketball_db;

DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS users;

CREATE TABLE teams (
  tid           INT NOT NULL PRIMARY KEY,
  team          VARCHAR(100) NOT NULL,
  abbreviation  VARCHAR(10)
);

CREATE TABLE players (
  pid          INT NOT NULL PRIMARY KEY,
  tid          INT,
  season       VARCHAR(50),
  stage        VARCHAR(50),
  pname        VARCHAR(100),
  gp           INT,
  min          INT,
  fgm          INT,
  fga          INT,
  threepm      INT,
  threepa      INT,
  ftm          INT,
  fta          INT,
  tov          INT,
  pf           INT,
  orb          INT,
  drb          INT,
  reb          INT,
  ast          INT,
  stl          INT,
  blk          INT,
  pts          INT,
  birth_year   INT,
  birth_month  VARCHAR(10),
  birth_date   VARCHAR(50),
  height       VARCHAR(20),
  height_cm    INT,
  weight       INT,
  weight_kg    INT,
  nationality  VARCHAR(50),
  high_school  VARCHAR(150),
  draft_round  INT,
  draft_pick   INT,
  draft_tid    INT,
  FOREIGN KEY (tid) REFERENCES teams(tid) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (draft_tid) REFERENCES teams(tid) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE users (
  uid 				INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  uname 			VARCHAR(50) NOT NULL UNIQUE,
  hashed_password 	VARCHAR(255) NOT NULL,
  salt 				VARCHAR(16),
  email				VARCHAR(100)
);

CREATE TABLE favourites (
  uid INT,
  pid INT,
  PRIMARY KEY (uid, pid),
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (pid) REFERENCES players(pid) ON DELETE CASCADE ON UPDATE CASCADE
);
