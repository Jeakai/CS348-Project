const userModel = require('../models/userModel');

exports.getUserProfile = async (req, res, next) => {
  try {
    console.log(req.user);
    console.log(req.user.email);
    const email = req.user.email; // Extracted from token by middleware
    const user = await userModel.findUserByEmail(email);

    if (!user[0]) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ uid: user[0].uid, uname: user[0].uname, email: user[0].email });
  } catch (error) {
    next(error);
  }
};
