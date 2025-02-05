const favouriteModel = require('../models/favModel');

exports.getUserFavourites = async (req, res, next) => {
  try {
    const { id } = req.params;
    const favourites = await favouriteModel.getUserFavourites(id);
    res.json(favourites);
  } catch (error) {
    next(error);
  }
};

exports.updateUserFavourites = async (req, res, next) => {
  let connection;
  try {
    const { id } = req.params;
    const { playerIds } = req.body;
    if (!Array.isArray(playerIds)) {
      return res.status(400).json({ error: 'playerIds should be an array' });
    }
    connection = await favouriteModel.getConnection();
    await favouriteModel.updateUserFavourites(connection, id, playerIds);
    res.json({ message: 'Favourites updated' });
  } catch (error) {
    if (connection) await connection.rollback();
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
