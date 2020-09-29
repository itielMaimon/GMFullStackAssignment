const express = require("express");
const router = express.Router();

const { getRides } = require("./services/rides");
const { getCoordinates } = require("./services/coordinates");

router.get("/", (req, res) => {
  res.send("Server is up and running");
});

router.get("/rides", async (req, res) => {
  res.json(await getRides());
});

router.get("/coordinates/:id", async (req, res) => {
  res.json(await getCoordinates(req.params.id));
});

module.exports = router;
