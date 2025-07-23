const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES
  });
};

exports.generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES
  });
};
