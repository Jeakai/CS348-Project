CREATE DATABASE IF NOT EXISTS my_basektball_db;
USE my_basketball_db;

DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS favourites;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;

CREATE TABLE teams (
  tid			INT NOT NULL PRIMARY KEY,
  tname			VARCHAR(100) NOT NULL,
  abbreviation 	VARCHAR(5)
);

CREATE TABLE users (
  uid 				INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  uname				VARCHAR(50) NOT NULL UNIQUE,
  hashed_password	VARCHAR(255) NOT NULL,
  email				VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE players (
  pid 			INT NOT NULL PRIMARY KEY,
  pname			VARCHAR(100) NOT NULL,
  birth_year	YEAR,
  birth_month	INT CHECK(birth_month > 0 AND birth_month <= 12),
  birth_date	DATE,
  nationality	VARCHAR(100),
  high_school	VARCHAR(100),
  draft_round	INT,
  draft_pick	INT,
  draft_tid		INT,
  FOREIGN KEY (draft_tid) REFERENCES teams(tid) ON DELETE CASCADE ON UPDATE CASCADE
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
  FOREIGN KEY (pid) REFERENCES players(pid) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (tid) REFERENCES teams(tid) ON DELETE CASCADE ON UPDATE CASCADE
);

