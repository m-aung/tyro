const { Pool } = require('pg');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const URI =
  process.env.NODE_ENV === 'testing' ? process.env.URL_TEST : process.env.URL;

const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('db connected...');
    return pool.query(text, params, callback);
  },
};
