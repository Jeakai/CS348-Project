-- user registration feature
INSERT INTO users (uname, hashed_password, email) 
VALUES ('hoopfan99','$2b$12$nC2ZlrPrFKdaIOPMd1XSH.QLgso5KwqdNDM/FNOXas84X4qa4Atgi', 'hoopfan99@example.com');

-- user login
SELECT * FROM users WHERE email = 'hoopfan99@example.com';

-- player search
SELECT * FROM players WHERE pname LIKE "%shaq%";

-- player sorting
SELECT pname, threepm FROM players
JOIN members ON players.pid = members.pid
ORDER BY threepm DESC LIMIT 5;
