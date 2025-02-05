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

exports.getPlayerSeasons = async (req, res, next) => {
  try {
    const { id } = req.params;
    const seasons = await playerModel.getPlayerSeasons(id);
    res.json(seasons);
  } catch (error) {
    next(error);
  }
};
