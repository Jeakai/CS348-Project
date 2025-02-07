- Local DB Setup:
  - Install MySQL Workbench
  - Run createTables.sql
  - Populate tables with data manually (Teams needs to be done before Players which should be before Favorites)
- Tested routes:
  - GET
    - /players -> gets all players
    - /teams -> gets all teams
    - /favorites/:id -> gets all favorites for user with uid = id
  - PUT
    - /favorites/:id -> updates favorites for user with uid = id; requires a body like `{"playerIds": [111, 117]}`
  - POST

# TODO:
- Test other routes