CREATE DATABASE IF NOT EXISTS my_basketball_db;
USE my_basketball_db;

DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;

CREATE TABLE teams (
  tid           DECIMAL(3,0) NOT NULL PRIMARY KEY,
  team          VARCHAR(100) NOT NULL,
  abbreviation  VARCHAR(10)
);

CREATE TABLE players (
  pid          DECIMAL(9,0) NOT NULL PRIMARY KEY,
  tid          DECIMAL(3,0),
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
  draft_tid    DECIMAL(3,0),
  FOREIGN KEY (tid) REFERENCES teams(tid)
);
