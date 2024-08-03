const bcrypt = require('bcrypt');
const User = require('./src/models/User'); // Adjust the path according to your project structure

async function initializeUsers() {
  const users = [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: 'adminpassword', // You can change this to a more secure password
      role: 'admin',
    },
    {
      username: 'user',
      email: 'user@example.com',
      password: 'userpassword', // You can change this to a more secure password
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
    } else {
      console.log(`${role} already exists: ${email}`);
    }
  }
}

module.exports = initializeUsers;
