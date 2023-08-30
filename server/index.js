require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
// default = env vars!
const pool = new Pool();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

pool.connect(async (err, client) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    try {
      await client.query('CREATE DATABASE IF NOT EXISTS sdc');
      await client.query('USE sdc');
      // await client.query(`
      //   CREATE TABLE IF NOT EXISTS Q_A (
      //     id SERIAL PRIMARY KEY,

      //   )
      // `);
      console.log('Database and table created successfully');
    } catch (error) {
      console.error('Error creating database and table:', error);
    } finally {
      client.release();
    }
  }
});



app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Listening at http://localhost:${process.env.PORT}`);
  }
});