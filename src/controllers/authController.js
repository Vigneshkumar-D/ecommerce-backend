

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User  = require('../models/User');
const supabaseClient = require('../config/supabase');

module.exports = {
  register: async (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const { data: { user }, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) throw new Error(error.message);
      // console.log("user ", User)
      const newUser = await User.create({ username, email, password: hashedPassword, role });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Registration error:', error.message);
      if (error.message.includes("Email rate limit exceeded")) {
        return res.status(429).json({ message: 'Too many registration attempts. Please try again later.' });
      }
    }
  },

  login: async (req, res) => {
    let { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) return res.status(404).json({ message: 'User not found' });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, username:user.username, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getUser: async (req, res) => {
    console.log("req", req)
    try {
      
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      console.error('Get user error:', error.message);
      res.status(500).json({ message: error.message });
    }
  },
};
