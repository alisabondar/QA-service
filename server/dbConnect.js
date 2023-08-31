const db = require('./db');

const queTable = `
  CREATE TABLE IF NOT EXISTS questions (
    q_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    q_body VARCHAR(1000),
    q_date INT8,
    q_name VARCHAR(60),
    q_email VARCHAR(60),
    q_reported INT,
    q_helpfulness INT
  )
`;
const ansTable = `
  CREATE TABLE IF NOT EXISTS answers (
    a_id SERIAL PRIMARY KEY UNIQUE,
    q_id INT NOT NULL,
    a_body VARCHAR(1000),
    a_date BIGINT,
    a_name VARCHAR(60),
    a_email VARCHAR(60),
    a_reported INT,
    a_helpfulness INT,
    FOREIGN KEY (q_id)
      REFERENCES questions (q_id)
  )
`;
const photosTable = `
  CREATE TABLE IF NOT EXISTS photos (
    id INT PRIMARY KEY,
    a_id INT,
    photo VARCHAR (200),
    FOREIGN KEY (a_id)
      REFERENCES answers (a_id)
  )
`;

const dbConnect = async () => {
  const client = await db.connect();

  try {
    console.log('Successfully connected');

    await client.query(queTable);
    await client.query(ansTable);
    await client.query(photosTable);
    console.log('Successfully created tables');

  } catch (err) {
    console.error('Cannot set up database:', err);
  } finally {
    client.release();
  }
}

module.exports = dbConnect;