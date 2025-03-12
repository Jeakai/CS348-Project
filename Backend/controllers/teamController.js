const teamModel = require('../models/teamModel');

exports.getTeams = async (req, res, next) => {
  try {
    const teams = await teamModel.getTeams();
    res.json(teams);
  } catch (error) {
    next(error);
  }
};

exports.getTeamDetails = async(req, res, next) => {
  const teamAbbr = req.params.abbr;
  
  try{
    console.log("Fetching details for team:", teamAbbr);

    if(!teamAbbr){
      return res.status(400).json({ error: "Team abbreviation not found."});
    }

    console.log("Received team abbreviation:", teamAbbr);

    const teamDetails = await teamModel.getTeamDetails(teamAbbr);
    
    if(!teamDetails){
      return res.status(404).json({ error:"Team not found."});
    }

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.json(teamDetails);
  } catch (error){
    next(error);
  }
};
