const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/', teamController.getTeams);
router.get("/:abbr", (req, res, next) => {
    // Log the team abbreviation from the route parameters
    console.log("Received request for team abbreviation:", req.params.abbr);
    console.log("Received request for name search:", req.query.search);
    console.log("Received season change:", req.query.season);
    // Pass the request to the next handler (teamController.getTeamDetails)
    next();
  }, teamController.getTeamDetails);

module.exports = router;
