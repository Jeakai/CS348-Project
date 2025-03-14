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

exports.addFavourite = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { pid } = req.body; // We expect { pid: number } in the request
    await favouriteModel.addFavourite(uid, pid);
    res.json({ message: 'Favourite added successfully' });
  } catch (error) {
    next(error);
  }
};

exports.removeFavourite = async (req, res, next) => {
  try {
    const { uid, pid } = req.params;
    await favouriteModel.removeFavourite(uid, pid);
    res.json({ message: 'Favourite removed successfully' });
  } catch (error) {
    next(error);
  }
};

// exports.toggleUserFavourite = async (req, res, next) => {
//   let connection;
//   try {
//     const { id } = req.params;
//     const { playerId } = req.body;
//     connection = await favouriteModel.getConnection();
//     await favouriteModel.toggleUserFavourite(connection, id, playerId);
//     res.json({ message: 'Favourite toggled' });
//   } catch (error) {
//     if (connection) await connection.rollback();
//     next(error);
//   } finally {
//     if (connection) connection.release();
//   }
// };
