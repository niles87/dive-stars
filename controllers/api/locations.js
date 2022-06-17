const { Location } = require("../../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await Location.getAll();
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "failed to fetch all locations" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { rows } = await Location.getOne(req.params);
    res.send(rows[0] || {});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "failed to fetch that location" });
  }
});

router.get("/:id/stats", async (req, res) => {
  let rows;
  try {
    switch (req.query.data) {
      case "duration":
        ({ rows } = await Location.getAverageTime(req.params));
        break;
      case "depth":
        ({ rows } = await Location.getMaxDepth(req.params));
        break;
      case "certification":
        ({ rows } = await Location.getCertification(req.params));
        break;
      default:
        res.status(404).send({ message: "no query with that name" });
        return;
    }

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "failed to fetch location stats" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { rows } = await Location.create(req.body);
    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
