const { Pool } = require('pg')

const pool = new Pool();

pool.on('error', (err, client) => {
  console.error('Error:', err);
});

module.exports = {
  query: async (text, params=null) => {
    try {
      const { rows } = await pool.query(text, params);
      return rows;
    } catch(err) {
      throw `${err}: Failed to query datbase`;
    }   
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      callback(err, client, done)
    })
  }
}