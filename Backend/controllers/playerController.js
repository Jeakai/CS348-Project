const playerModel = require('../models/playerModel');

exports.getPlayers = async (req, res, next) => {
  try {
    const { search, sortBy, order, groupBy } = req.query;
    const players = await playerModel.getPlayers(search, sortBy, order, groupBy);
    res.json(players);
  } catch (error) {
    next(error);
  }
};
