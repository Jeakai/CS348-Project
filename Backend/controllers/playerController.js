const playerModel = require("../models/playerModel");

exports.getPlayers = async (req, res, next) => {
  try {
    let { search, sortBy, order, groupBy } = req.query;

    order = order && order.toLowerCase() === "desc" ? "DESC" : "ASC";

    const validSortColumns = ["pname", "season", "nationality", "pts", "ast", "reb", "blk", "stl"];
    if (sortBy && !validSortColumns.includes(sortBy)) {
      console.log("Invalid sort column:", sortBy);
      return res.status(400).json({ error: "Invalid sort column" });
    }

    const players = await playerModel.getPlayers(search, sortBy, order, groupBy);

    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Internal server error" });
    next(error);
  }
};
