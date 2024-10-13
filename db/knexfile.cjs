// Update with your config settings.
require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env'),
});
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  }
}

console.log('DATABASE_HOST', process.env.DATABASE_HOST);
