const db = require("./connection");

db.query("select random_between(1, 5) ")
  .then(({ rows }) => {
    console.log(rows);
  })
  .catch((err) => {
    console.log(err);
  });
