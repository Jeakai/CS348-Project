const teamModel = require('../models/teamModel');

exports.getTeams = async (req, res, next) => {
  try {
    const teams = await teamModel.getTeams();
    res.json(teams);
  } catch (error) {
    next(error);
  }
};
