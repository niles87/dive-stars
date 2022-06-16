const db = require("../config/connection");

class Diver {
  getAll() {
    return db.query(`select * from divers order by last_name`);
  }

  getOne({ id }) {
    return db.query(`select * from divers where id = $1`, [id]);
  }

  getTotalDives({ id }) {
    return db.query(
      `
    select count(diver_id) as number_of_dives
    from dives
    where diver_id = $1
    group by diver_id
    `,
      [id]
    );
  }
}

module.exports = new Diver();
