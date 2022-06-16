const db = require("../config/connection");

class Location {
  getAll() {
    return db.query(`select * from locations order by name`);
  }

  getOne({ id }) {
    return db.query(`select * from locations where id = $1`, [id]);
  }

  getAverageTime({ id }) {
    return db.query(
      `
      select avg(duration)::int as average_duration from dives
      where location_id = $1
      group by location_id
      `,
      [id]
    );
  }

  getMaxDepth({ id }) {
    return db.query(
      `
      select
      concat(divers.first_name, ' ', divers.last_name) as diver_name, 
      dives.depth
      from dives
      left join divers on dives.diver_id = divers.id
      where dives.depth = (
        select MAX(depth)
        from dives
        where location_id = $1
      )
      `,
      [id]
    );
  }

  getCertification({ id }) {
    return db.query(
      `
      with certs AS (
        select distinct dives.diver_id, certifications.name from dives
        left join divers ON dives.diver_id = divers.id
        left join certifications ON divers.certification_id = certifications.id
        where dives.location_id = $1
        group by dives.diver_id, certifications.name
      )
      select name from certs
      group by name
      order by count(name) desc limit 1
      `,
      [id]
    );
  }
}

module.exports = new Location();
