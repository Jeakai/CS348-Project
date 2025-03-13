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
   - *open the localhost url in browser*

*If issues arise, check that `./Backend/.env` has the proper credentials*

[Dataset](https://www.kaggle.com/code/isaienkov/basketball-players-stats-extended-analysis/input)
