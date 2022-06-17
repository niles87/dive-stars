const router = require("express").Router();
const { Dive } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const { rows } = await Dive.getLatest();

    res.send(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "failed to fetch latest dives" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    if (req.query.data == "most_active_month") {
      const { rows } = await Dive.getActiveMonth();
      res.send(rows);
    } else {
      res.status(404).send({ message: "no query with that name" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "failed to fetch most active month" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { rows } = await Dive.create(req.body);
    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
