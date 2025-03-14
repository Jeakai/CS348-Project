-- user registration    feature 1
INSERT INTO users (uname, hashed_password, email) 
VALUES ('hoopfan99','$2b$12$nC2ZlrPrFKdaIOPMd1XSH.QLgso5KwqdNDM/FNOXas84X4qa4Atgi', 'hoopfan99@example.com');

-- user login   feature 2
SELECT * FROM users WHERE email = 'hoopfan99@example.com';

-- player search    feature 3
SELECT * FROM players WHERE pname LIKE "%shaq%";

-- player sorting   feature 4
SELECT pname, threepm FROM players
JOIN members ON players.pid = members.pid
ORDER BY threepm DESC LIMIT 5;

-- favouriting player   feature 5a
INSERT INTO favourites (uid, pid)
VALUES (106, 126);
-- make sure it is added
SELECT * FROM favourites WHERE uid = 106 AND pid = 126;

-- unfavouriting player     feature 5b
DELETE FROM favourites WHERE uid = 106 AND pid = 126;
-- make sure it is deleted
SELECT * FROM favourites WHERE uid = 106 AND pid = 126;

-- displaying all players from team (current & old) feature 6
WITH combined_pts (pid, tid, season, pts) AS (
	SELECT pid, tid, season, SUM(pts) pts
    FROM members
    WHERE tid IN (SELECT tid FROM teams WHERE abbreviation = "MIL")
    GROUP BY pid, tid, season
)
SELECT t.tid, t.team, t.abbreviation, p.pid, p.pname player_name, cp.season, cp.pts 
FROM combined_pts cp
JOIN players p ON p.pid = cp.pid
JOIN teams t ON t.tid = cp.tid
ORDER BY pts DESC, p.pname;

-- displaying all players from team (for a specific season) feature 6 2nd variation
WITH combined_pts (pid, tid, season, pts) AS (
	SELECT pid, tid, season, SUM(pts) pts
    FROM members
    WHERE tid IN (SELECT tid FROM teams WHERE abbreviation = "DET")
    GROUP BY pid, tid, season
)
SELECT t.tid, t.team, t.abbreviation, p.pid, p.pname player_name, cp.season, cp.pts 
FROM combined_pts cp
JOIN players p ON p.pid = cp.pid
JOIN teams t ON t.tid = cp.tid
WHERE cp.season = "1999 - 2000"
ORDER BY pts DESC, p.pname;
