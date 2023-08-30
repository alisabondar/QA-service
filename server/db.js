require('dotenv').config();
const { Pool } = require('pg');

// defaults to env vars
const pool = new Pool();

module.exports = pool;