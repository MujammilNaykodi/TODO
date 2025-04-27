const db = require('./models');

const seed = async () => {
  await db.sequelize.sync({ force: true }); // Drops and recreates tables

  const users = await db.User.bulkCreate([
    { username: 'john_doe', email: 'john@example.com' },
    { username: 'sarah_smith', email: 'sarah@example.com' },
    { username: 'alex_jones', email: 'alex@example.com' },
    { username: 'emma_wilson', email: 'emma@example.com' },
    { username: 'mike_brown', email: 'mike@example.com' },
  ]);

  console.log('✅ Users seeded:', users.map(u => u.username));
  process.exit();
};

seed();
