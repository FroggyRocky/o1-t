const bcrypt = require('bcrypt');

// ./seeds/[timestamp]_seed_users.js
exports.seed = async function(knex) {

  await knex('users').del();


  const passwordHash1 = await bcrypt.hash('123456', 10);
  const passwordHash2 = await bcrypt.hash('123456', 10);
  const passwordHash3 = await bcrypt.hash('123456', 10);

  // Insert users with hashed passwords
  await knex('users').insert([
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      password: passwordHash1,
      created_at: new Date(),
      verified: true
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      password: passwordHash2,
      created_at: new Date(),
      verified: false
    },
    {
      id: 3,
      name: 'Charlie',
      email: 'charlie@example.com',
      password: passwordHash3,
      created_at: new Date(),
      verified: true
    }
  ]);
};
