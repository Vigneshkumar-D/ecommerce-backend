const  Session  = require('../models/Session');

module.exports = {
  createSession: async (req, res) => {
    const { userId, loginTime, ipAddress } = req.body;
    try {
      const session = await Session.create({ userId, loginTime, ipAddress });
      res.status(201).send(session);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getSessions: async (req, res) => {
    try {
      const sessions = await Session.findAll({ where: { userId: req.user.id } });
      res.send(sessions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateSession: async (req, res) => {
    const { id } = req.params;
    const { logoutTime } = req.body;
    try {
      const session = await Session.findByPk(id);
      if (!session) return res.status(404).send('Session not found');

      await session.update({ logoutTime });
      res.send(session);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
