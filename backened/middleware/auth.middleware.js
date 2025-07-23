const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader;

  if (!token) errorResponse(res, 'No token provided', 'Authentication failed', 401);

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(!user){
         errorResponse(res, 'Invalid token', 'Authentication failed', 403);
    }
    
    req.user = user;
    next(); 
  } catch (err) {
    errorResponse(res, 'Invalid token', 'Authentication failed', 403);
  }
};
