const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const Ride = require("./models/ride");

const metadata = "./db/metadata.json";
const gps_coordinates = "./db/gps_coordinates.json";

const initialRides = [];
const initialCoordinates = [];

const metadataStore = {
  async read() {
    try {
      await fs.access(metadata);
      this.rides = JSON.parse((await fs.readFile(metadata)).toString());
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

const coordinatesStore = {
  async read() {
    try {
      await fs.access(gps_coordinates);
      this.coordinates = JSON.parse(
        (await fs.readFile(gps_coordinates)).toString()
      );
    } catch (e) {
      this.coordinates = initialCoordinates;
    }

    return this.coordinates;
  },

  coordinates: [],
};

router.get("/", (req, res) => {
  res.send("Server is up and running");
});

router.get("/rides", async (req, res) => {
  //   const rideList = await Ride.find().sort({ date: -1 }).limit(5);
  //   res.json({ rides: rideList });
  res.json(await metadataStore.read());
});

router.get("/coordinates", async (req, res) => {
  res.json(await coordinatesStore.read());
});

module.exports = router;
