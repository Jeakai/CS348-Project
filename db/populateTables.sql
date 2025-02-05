INSERT INTO players
  SELECT * FROM read_csv('/dummy/players.csv');
--   SELECT * FROM read_csv('/prod/players.csv');
SELECT * FROM players;

INSERT INTO teams
  SELECT * FROM read_csv('./dummy/teams.csv');
--   SELECT * FROM read_csv('./prod/teams.csv');
SELECT * FROM teams;

INSERT INTO users
  SELECT * FROM read_csv('./dummy/users.csv');
SELECT * FROM users;