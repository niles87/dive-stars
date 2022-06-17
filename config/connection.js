const { Pool, types } = require("pg");
require("dotenv").config();

const pool = new Pool();

types.setTypeParser(1700, (val) => parseFloat(val));
types.setTypeParser(20, (val) => parseInt(val));

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
  getClient: () => {
    return pool.connect();
  },
};
