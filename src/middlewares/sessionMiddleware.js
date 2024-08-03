const { Session } = require('../models');

const sessionMiddleware = async (req, res, next) => {
  const sessionId = req.headers['session-id'];
  if (!sessionId) return res.status(401).send('No session ID provided.');

  try {
    const session = await Session.findByPk(sessionId);
    if (!session) return res.status(401).send('Session not found.');

    req.session = session;
    next();
  } catch (error) {
    res.status(500).send('Internal server error.');
  }
};

module.exports = sessionMiddleware;
