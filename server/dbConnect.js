const db = require('./db');

async function dbConnect() {
  const client = await db.connect();

  try {
    console.log('Successfully connected');
  } catch (err) {
    console.error('Cannot set up database:', err);
  } finally {
    client.release();
  }
}

module.exports = dbConnect;

// await client.query('DROP DATABASE IF EXISTS q_a');
// console.log('Database dropped successfully');

// await client.query('CREATE DATABASE q_a');
// console.log('Database created successfully');