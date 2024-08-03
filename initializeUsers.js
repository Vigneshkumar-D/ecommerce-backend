const bcrypt = require('bcrypt');
const User = require('./src/models/User'); 
async function initializeUsers() {
  const users = [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin@123', 
      role: 'admin',
    },
    {
      username: 'user',
      email: 'user@example.com',
      password: 'user@123', 
      role: 'user',
    },
  ];

  for (const userData of users) {
    const { username, email, password, role } = userData;

    const existingUser = await User.findOne({ where: { email } });
    // console.log("existingUser ", existingUser);
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, email, password: hashedPassword, role });
      console.log(`Created ${role}: ${email}`);
      console.log(`Created ${role}: ${password}`);
    } else {
      console.log(`${role} already exists: ${email}`);
    }
  }
}

module.exports = initializeUsers;
