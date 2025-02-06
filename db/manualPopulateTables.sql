INSERT INTO users (uid, uname, hashed_password, salt, email)
VALUES
(101, 'alice', '5f4dcc3b5aa765d61d8327deb882cf99', 'abc123xyz', 'alice@example.com'),
(102, 'bob', '7c6a180b36896a0a8c02787eeafb0e4c', 'xyz456abc', 'bob@example.com'),
(103, 'charlie', '6c9b8f2a8b0b8c3e4d5e6f7a8b9c0d1e2', 'qwe789rty', 'charlie@example.com'),
(104, 'dave', '8d7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2', 'asd123fgh', 'dave@example.com'),
(105, 'eve', '9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3', 'zxc456vbn', 'eve@example.com');

INSERT INTO teams (tid, team, abbreviation)
VALUES
(101, 'Boston Celtics', 'BOS'),
(102, 'Brooklyn Nets', 'BKN'),
(103, 'New Jersey Nets', 'NJN'),
(104, 'New York Knicks', 'NYK'),
(105, 'Philadelphia 76ers', 'PHI'),
(106, 'Toronto Raptors', 'TOR'),
(107, 'Chicago Bulls', 'CHI'),
(108, 'Cleveland Cavaliers', 'CLE'),
(109, 'Detroit Pistons', 'DET'),
(110, 'Indiana Pacers', 'IND'),
(111, 'Milwaukee Bucks', 'MIL'),
(112, 'Atlanta Hawks', 'ATL'),
(113, 'Charlotte Hornets', 'CHA'),
(114, 'Charlotte Bobcats', 'CHA'),
(115, 'Miami Heat', 'MIA'),
(116, 'Orlando Magic', 'ORL'),
(117, 'Washington Wizards', 'WAS'),
(118, 'Washington Bullets', 'WAS'),
(119, 'Denver Nuggets', 'DEN'),
(120, 'Minnesota Timberwolves', 'MIN'),
(121, 'Oklahoma City Thunder', 'OKC'),
(122, 'Seattle SuperSonics', 'SEA'),
(123, 'Portland Trail Blazers', 'POR'),
(124, 'Utah Jazz', 'UTA'),
(125, 'Golden State Warriors', 'GSW'),
(126, 'Los Angeles Clippers', 'LAC'),
(127, 'Los Angeles Lakers', 'LAL'),
(128, 'Phoenix Suns', 'PHX'),
(129, 'Sacramento Kings', 'SAC'),
(130, 'Dallas Mavericks', 'DAL'),
(131, 'Houston Rockets', 'HOU'),
(132, 'Memphis Grizzlies', 'MEM'),
(133, 'Vancouver Grizzlies', 'VAN'),
(134, 'New Orleans Pelicans', 'NOP'),
(135, 'New Orleans Hornets', 'NOH'),
(136, 'New Orleans/Oklahoma City Hornets', 'NOK'),
(137, 'San Antonio Spurs', 'SAS');

INSERT INTO players (pid, tid, season, stage, pname, gp, min, fgm, fga, 3pm, 3pa, ftm, fta, tov, pf, orb, drb, reb, ast, stl, blk, pts, birth_year, birth_month, birth_date, height, height_cm, weight, weight_kg, nationality, high_school, draft_round, draft_pick, draft_tid)
VALUES
(111, 127, '1999 - 2000', 'Regular_Season', 'Shaquille O\'Neal', 79, 3163, 956, 1665, 0, 1, 432, 824, 223, 255, 336, 742, 1078, 299, 36, 239, 2344, 1972, 'Mar', '6-Mar-72', '7\'1', 216, 325, 147, 'United States', 'Robert G. Cole High School', 1, 1, 116),
(112, 106, '1999 - 2000', 'Regular_Season', 'Vince Carter', 82, 3126, 788, 1696, 95, 236, 436, 551, 178, 263, 150, 326, 476, 322, 110, 92, 2107, 1977, 'Jan', '26-Jan-77', '6\'6', 198, 220, 100, 'United States', 'Mainland High School', 1, 5, 125),
(113, 124, '1999 - 2000', 'Regular_Season', 'Karl Malone', 82, 2947, 752, 1476, 2, 8, 589, 739, 231, 229, 169, 610, 779, 304, 79, 71, 2095, 1963, 'Jul', '24-Jul-63', '6\'9', 206, 265, 120, 'United States', 'Summerfield High School', 1, 13, 124),
(114, 105, '1999 - 2000', 'Regular_Season', 'Allen Iverson', 70, 2853, 729, 1733, 89, 261, 442, 620, 230, 162, 71, 196, 267, 328, 144, 5, 1989, 1975, 'Jun', '7-Jun-75', '6-6\'0', 183, 165, 75, 'United States', 'Bethel High School', 1, 1, 105),
(115, 122, '1999 - 2000', 'Regular_Season', 'Gary Payton', 82, 3425, 747, 1666, 177, 520, 311, 423, 224, 178, 100, 429, 529, 732, 153, 18, 1982, 1968, 'Jul', '23-Jul-68', '6\'4', 193, 180, 82, 'United States', 'Skyline High School', 1, 2, 122),
(116, 109, '1999 - 2000', 'Regular_Season', 'Jerry Stackhouse', 82, 3148, 619, 1447, 83, 288, 618, 758, 311, 188, 118, 197, 315, 365, 103, 36, 1939, 1974, 'Nov', '5-Nov-74', '6\'6', 198, 218, 99, 'United States', 'Oak Hill Academy', 1, 3, 105),
(117, 109, '1999 - 2000', 'Regular_Season', 'Grant Hill', 74, 2776, 696, 1422, 34, 98, 480, 604, 240, 190, 97, 393, 490, 385, 103, 43, 1906, 1972, 'Oct', '5-Oct-72', '6\'8', 203, 225, 102, 'United States', 'South Lakes High School', 1, 3, 109),
(118, 120, '1999 - 2000', 'Regular_Season', 'Kevin Garnett', 81, 3243, 759, 1526, 30, 81, 309, 404, 268, 205, 223, 733, 956, 401, 120, 126, 1857, 1976, 'May', '19-May-76', '6\'11', 211, 240, 109, 'United States', 'Farragut Career Academy', 1, 5, 120),
(119, 130, '1999 - 2000', 'Regular_Season', 'Michael Finley', 82, 3464, 748, 1636, 99, 247, 260, 317, 196, 171, 122, 396, 518, 438, 109, 32, 1855, 1973, 'Mar', '6-Mar-73', '6\'7', 201, 225, 102, 'United States', 'Proviso East High School', 1, 21, 128),
(120, 129, '1999 - 2000', 'Regular_Season', 'Chris Webber', 75, 2880, 748, 1548, 27, 95, 311, 414, 218, 264, 189, 598, 787, 345, 120, 128, 1834, 1973, 'Mar', '1-Mar-73', '6\'9', 206, 245, 111, 'United States', 'Detroit Country Day School', 1, 1, 116),
(121, 111, '1999 - 2000', 'Regular_Season', 'Ray Allen', 82, 3070, 642, 1411, 172, 407, 353, 398, 183, 187, 83, 276, 359, 308, 110, 19, 1809, 1975, 'Jul', '20-Jul-75', '6\'5', 196, 205, 93, 'United States', 'Hillcrest High School', 1, 5, 120),
(122, 115, '1999 - 2000', 'Regular_Season', 'Alonzo Mourning', 79, 2748, 652, 1184, 0, 4, 414, 582, 217, 308, 215, 538, 753, 123, 40, 294, 1718, 1970, 'Feb', '8-Feb-70', '6\'10', 208, 240, 109, 'United States', 'Indian River High School', 1, 2, 113),
(123, 137, '1999 - 2000', 'Regular_Season', 'Tim Duncan', 74, 2875, 628, 1281, 1, 11, 459, 603, 242, 210, 262, 656, 918, 234, 66, 165, 1716, 1976, 'Apr', '25-Apr-76', '6\'11', 211, 250, 113, 'United States', 'St. Dunstan\'s Episcopal High School', 1, 1, 137),
(124, 111, '1999 - 2000', 'Regular_Season', 'Glenn Robinson', 81, 2909, 690, 1461, 86, 237, 227, 283, 223, 212, 107, 378, 485, 193, 78, 41, 1693, 1973, 'Jan', '10-Jan-73', '6\'7', 201, 225, 102, 'United States', 'Theodore Roosevelt High School', 1, 1, 111),
(125, 101, '1999 - 2000', 'Regular_Season', 'Antoine Walker', 82, 3003, 648, 1506, 73, 285, 311, 445, 259, 263, 199, 453, 652, 305, 117, 32, 1680, 1976, 'Aug', '12-Aug-76', '6\'9', 206, 265, 120, 'United States', 'Mount Carmel High School', 1, 6, 101),
(126, 133, '1999 - 2000', 'Regular_Season', 'Shareef Abdur-Rahim', 82, 3223, 594, 1277, 29, 96, 446, 551, 249, 244, 218, 607, 825, 271, 89, 87, 1663, 1976, 'Dec', '11-Dec-76', '6\'9', 206, 225, 102, 'United States', 'Joseph Wheeler High School', 1, 3, 133),
(127, 103, '1999 - 2000', 'Regular_Season', 'Stephon Marbury', 74, 2881, 569, 1317, 66, 233, 436, 536, 270, 195, 61, 179, 240, 622, 112, 15, 1640, 1977, 'Feb', '20-Feb-77', '6\'2', 188, 180, 82, 'United States', 'Abraham Lincoln High School', 1, 4, 111),
(128, 107, '1999 - 2000', 'Regular_Season', 'Elton Brand', 81, 2999, 630, 1306, 0, 2, 367, 536, 228, 259, 348, 462, 810, 155, 66, 132, 1627, 1979, 'Mar', '11-Mar-79', '6\'9', 206, 254, 115, 'United States', 'Peekskill High School', 1, 1, 107),
(129, 104, '1999 - 2000', 'Regular_Season', 'Allan Houston', 82, 3169, 614, 1271, 106, 243, 280, 334, 186, 219, 38, 233, 271, 224, 65, 14, 1614, 1971, 'Apr', '20-Apr-71', '6\'6', 198, 205, 93, 'United States', 'Ballard High School', 1, 11, 109),
(130, 119, '1999 - 2000', 'Regular_Season', 'Antonio McDyess', 81, 2698, 614, 1211, 0, 2, 323, 516, 230, 316, 234, 451, 685, 159, 69, 139, 1551, 1974, 'Sep', '7-Sep-74', '6\'9', 206, 245, 111, 'United States', 'Quitman High School', 1, 2, 126);

INSERT INTO favourites (uid, pid)
VALUES
(104, 121),
(104, 115),
(103, 115),
(101, 117),
(103, 126);


