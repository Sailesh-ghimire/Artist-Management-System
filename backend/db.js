const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config.db);
pool.on('connect', () => {
  // console.log('Connected to the database');
});

pool.on('error', err => {
  console.error('Unexpected error on database connectiont', err);
  process.exit(-1);
});

module.exports = pool;
