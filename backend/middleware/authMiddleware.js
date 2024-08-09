const { verifyToken } = require('../config/jwt');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({message: 'Access denied. No token provided.'});
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({message: 'Invalid token.'});
  }

  req.user = decoded;
  next();
};

module.exports = authenticateJWT;