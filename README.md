# CS348-Project
## Create & Load The Sample Database
1. Install & open the MySQL workbench, and start a local session
2. Open & run the file `./db/createTables.sql`, this will create the database and initialize the schemas
3. Load data manually by using Import Wizard on each relation in the schemas panel on the left with the csv files in `./db/dummy`
   - Import in the following order: `users`, `teams`, `players`, `members`, `favourites`

## Create & Load The Production Database
1. Install & open the MySQL workbench, and start a local session
2. Open & run the file `./db/createTables.sql`, this will create the database and initialize the schemas
3. Download the dataset from [kaggle](https://www.kaggle.com/code/isaienkov/basketball-players-stats-extended-analysis/input) 
4. In the `./db` directory, run the python script `python3 make_csvs.py <path to dataset>` which will populate the `./db/prod` directory with the production data for `players` and `members`, while already containing the data for `teams`
5. Load data manually by using Import Wizard for the `teams`, `players`, and `members` relations in the schemas panel on the left with the csv files in `./db/prod` following that respective order

*The `users` and `favourites` relations have no starting data and will be filled by the application at runtime*

## Run the application 
1. `cd ./Backend`
   - `npm install`
   - `npm start`
2. `cd ./frontend`
   - `npm install`
   - `npm run build`
   - `npm run dev`
   - *Open the localhost url in browser with port number 3000. If a fetching error occurs, try removing the auth token by opening the console, clicking on the `Application` tab and looking in the `Local storage` tab. If all else fails, try port number 5137*

*If issues arise, check that `./Backend/.env` has the proper credentials*
*Additionally, *

## Implemented Features
### Feature 1 -  User Registration
- [Signup.tsx](./frontend/src/pages/Signup.tsx)
- [authRoutes.js](./Backend/routes/authRoutes.js)
- [authController.js](./Backend/controllers/authController.js)
- [userModel.js](./Backend/models/userModel.js)

### Feature 2 - User Login
- [Login.tsx](./frontend/src/pages/Login.tsx)
- [authRoutes.js](./Backend/routes/authRoutes.js)
- [authController.js](./Backend/controllers/authController.js)
- [userModel.js](./Backend/models/userModel.js)

### Feature 3 - Player Search
- [Players.tsx](./frontend/src/pages/Players.tsx)
- [playerRoutes.js](./Backend/routes/playerRoutes.js)
- [playerController.js](./Backend/controllers/playerController.js)
- [playerModel.js](./Backend/models/playerModel.js)

### Feature 4 - Player Sorting
*Same files as feature 3*

### Feature 6 - Players from team (current & old)
- [Teams.tsx](./frontend/src/pages/Teams.tsx)
- [TeamDetails.tsx](./frontend/src/pages/TeamDetails/tsx)
- [teamRoutes.js](./Backend/routes/teamRoutes.js)
- [teamController.js](./Backend/controllers/teamController.js)
- [teamModel.js](./Backend/models/teamModel.js)
