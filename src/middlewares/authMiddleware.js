const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Access denied. No token provided.' });

  const token = authHeader.split(' ')[1];
  // console.log("token: ", token)
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const {username}  = decoded;

    const user = await User.findOne({ where: { username } });
    req.user = user;
    if (!user) return res.status(401).json({ message: 'Invalid token. jhjk' });

    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
