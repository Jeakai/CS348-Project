# CS348-Project
## Create & Load The Sample Database
1. Install & open the MySQL workbench, and start a local session
2. Open & run the file ./db/createTables.sql, this will create the database and initialize the schemas
3. Load data manually by using Import Wizard on each relation in the schemas panel on the left.
   - Import in the following order: users, teams, players, members, favourites

## Run the application 
1. cd ./Backend
   - npm install
   - npm start
2. cd ./frontend
   - npm install
   - npm run build
   - npm run dev
   - open the localhost url in browser

*If issues arise, check that ./Backend/.env has proper credentials*
