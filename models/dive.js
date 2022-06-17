const db = require("../config/connection");

class Dive {
  getLatest() {
    return db.query(`select * from dives order by dive_date desc limit 100`);
  }

  getActiveMonth() {
    return db.query(`
    SELECT
    DATE_TRUNC('month', dive_date) AS month,
    COUNT(*) AS dive_count
    FROM dives
    WHERE dive_date > NOW() - INTERVAL '1 year'
    GROUP BY month
    ORDER BY dive_count DESC
    LIMIT 1
    `);
  }

  create(dive) {
    const { depth, duration, diver_id, location_id } = dive;
    return db.query(
      `insert into dives (depth, duration, diver_id, location_id) values ($1, $2, $3, $4) returning *`,
      [depth, duration, diver_id, location_id]
    );
  }
}

module.exports = new Dive();
