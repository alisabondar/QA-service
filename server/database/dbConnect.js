const db = require('./db');

const queTable = `
  CREATE TABLE IF NOT EXISTS questions (
    q_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    q_body VARCHAR(1000),
    q_date BIGINT,
    q_name VARCHAR(60),
    q_email VARCHAR(60),
    q_report INT DEFAULT 0,
    q_helpful INT DEFAULT 0
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
    a_report INT DEFAULT 0,
    a_helpful INT DEFAULT 0,
    FOREIGN KEY (q_id)
      REFERENCES questions (q_id)
  )
`;
const photosTable = `
  CREATE TABLE IF NOT EXISTS photos (
    id SERIAL PRIMARY KEY,
    a_id INT NOT NULL,
    photo VARCHAR(200),
    FOREIGN KEY (a_id)
      REFERENCES answers (a_id)
  )
`;

const dbConnect = () => {
  return db
    .connect()
    .then(client => {
      console.log('Successfully connected');

      return client
        .query(queTable)
        .then(() => client.query(ansTable))
        .then(() => client.query(photosTable))
        .then(() => console.log('Successfully created tables'))
        .catch(err => console.error('Cannot set up database:', err))
        .finally(() => client.release());
    })
    .catch(err => {
      console.error('Cannot connect to the database:', err);
    });
};

module.exports = dbConnect;