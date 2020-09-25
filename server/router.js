const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const Ride = require("./models/ride");

const fileName = "./db/metadata.json";

const initialRides = [];

const store = {
  async read() {
    try {
      await fs.access(fileName);
      this.rides = JSON.parse((await fs.readFile(fileName)).toString());
    } catch (e) {
      this.rides = initialRides;
    }

    return this.rides;
  },

  async getIndexById(id) {
    try {
      const rides = await this.read();
      return rides.findIndex((ride) => ride.id === +id);
    } catch (e) {
      console.log(e);
    }
  },

  async getNextRideId() {
    let maxId = 0;
    const rides = await this.read();
    rides.forEach((ride) => {
      if (ride.id > maxId) maxId = ride.id;
    });
    return maxId + 1;
  },

  rides: [],
};

router.get("/", (req, res) => {
  res.send("Server is up and running");
});

router.get("/rides", async (req, res) => {
  //   const rideList = await Ride.find().sort({ date: -1 }).limit(5);
  //   res.json({ rides: rideList });
  res.json(await store.read());
});

module.exports = router;
