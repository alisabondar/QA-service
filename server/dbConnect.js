const db = require('./db');

const queTable = `
  CREATE TABLE IF NOT EXISTS questions (
    q_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    q_body VARCHAR(1000),
    q_date TIMESTAMP,
    q_name VARCHAR(60),
    q_helpfulness INT,
    q_reported INT,
    q_email VARCHAR(60)
  )
`;
const ansTable = `
  CREATE TABLE IF NOT EXISTS answers (
    a_id SERIAL PRIMARY KEY UNIQUE,
    q_id INT NOT NULL,
    a_body VARCHAR(1000),
    a_date TIMESTAMP,
    a_name VARCHAR(60),
    a_helpfulness INT,
    a_reported INT,
    a_email VARCHAR(60),
    FOREIGN KEY (q_id)
      REFERENCES questions (q_id)
  )
`;
const photosTable = `
  CREATE TABLE IF NOT EXISTS photos (
    a_id INT PRIMARY KEY,
    photo VARCHAR (200),
    FOREIGN KEY (a_id)
      REFERENCES answers (a_id)
  )
`;

async function dbConnect() {
  const client = await db.connect();

  try {
    console.log('Successfully connected');
    // let test = client.query('SELECT current_database()');
    // console.log(test);
    client.query(queTable);
    client.query(ansTable);
    client.query(photosTable);
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