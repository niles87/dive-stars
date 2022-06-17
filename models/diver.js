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

  create(diver) {
    const { first_name, last_name, is_instructor, certification_id } = diver;

    return db.query(
      `insert into divers (first_name, last_name, is_instructor, certification_id) values ($1, $2, $3, $4) returning *`,
      [first_name, last_name, is_instructor, certification_id]
    );
  }
}

module.exports = new Diver();
