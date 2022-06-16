const router = require("express").Router();
const dives = require("./dives");
const divers = require("./divers");
const locations = require("./locations");

router.use("/dives", dives);
router.use("/divers", divers);
router.use("/locations", locations);

module.exports = router;
