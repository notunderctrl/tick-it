const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const token = cookies?.token;

    if (!token) return next();

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken?.id) {
      const targetUser = await User.findOne({ id: decodedToken.id }).lean();

      if (targetUser) req.user = targetUser;
    }
  } catch (error) {
    console.error(error);
  }

  next();
};
