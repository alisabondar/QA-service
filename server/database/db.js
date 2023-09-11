require('dotenv').config();
const { Pool } = require('pg');

// defaults to env variables
const pool = new Pool();

module.exports = pool;