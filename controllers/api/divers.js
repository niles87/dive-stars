const router = require("express").Router();
const { Diver } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const { rows } = await Diver.getAll();
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "could not fetch all divers" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { rows } = await Diver.getOne(req.params);
    res.send(rows[0] || {});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "failed to fetch that diver" });
  }
});

router.get("/:id/stats", async (req, res) => {
  try {
    if (req.query.data == "total_dives") {
      const { rows } = await Diver.getTotalDives(req.params);
      res.send(rows[0] || {});
    } else {
      res.status(404).send({ message: "no query with that name" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "failed to retrieve stats" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { rows } = await Diver.create(req.body);
    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "failed to create diver" });
  }
});

module.exports = router;
